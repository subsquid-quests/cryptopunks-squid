import * as abi from '../abi/cryptopunks'
import {
    MINIMUM_BLOCK_HEIGHT_TO_SEND_NOTIFICATION,
    WRAPPED_PUNK_ADDRESS,
    ZERO_ADDRESS,
} from './share/constants'
import {Account, Trait, Contract, TraitType, UserProxy, Punk} from '../model'
import {
    closeOldAsk,
    closeOldBid,
    createAccessoryId,
    getGlobalId,
    instantiateAccount,
    instantiateAsk,
    instantiateAskCreated,
    instantiateAskRemoved,
    instantiateAssign,
    instantiateBid,
    instantiateBidCreated,
    instantiateBidRemoved,
    instantiateCToken,
    instantiateMetaData,
    instantiateMetaDataTrait,
    instantiatePunk,
    instantiateSale,
    instantiateTransfer,
    lookupCachedCToken,
    updateAccountAggregates,
    updateAccountHoldings,
    updateContractAggregates,
    updatePunkOwner,
    updatePunkSaleAggregates,
    updateSale,
} from './share/entitites'
import {getTrait} from './share/traits'
import {Deferred} from '../context'
import {Transfer} from '../model/generated/transfer.model'
import {defaultPunkRelations} from './share/relations'
import {createMapping} from './share/mapper'
import {fetchCryptoPunkContract} from './share/contracts'
import {
    handleAskNotification,
    handleBidNotification,
    handleSaleNotification,
} from './share/notification'

const mapping = createMapping(abi, '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB')

mapping.startBlock = 3914494

mapping.filters = {
    handlePunkBought: (ctx, log) => {
        const r = ctx.transferRecorder.hasAssociatedCToken(log)
        if (!r) {
            ctx.log.error(
                `Transfer record not found for bought ${getGlobalId(log)}`,
            )
        }
        return r
    },
}

mapping.handlers.handleAssign = async (ctx, log, event) => {
    const toId = event.to.toLowerCase()
    const trait = getTrait(Number(event.punkIndex))
    const toAccountDeferred = ctx.esm.prepare(Account, toId)
    const contractDeferred = ctx.esm.prepare(
        Contract,
        log.address.toLowerCase(),
    )

    const traitTypeDeferred = trait
        ? ctx.esm.prepare(Trait, trait.type)
        : undefined
    const traitAccessoryDeferred = new Map<string, Deferred<Trait>>()
    if (trait) {
        trait.accessories.forEach((accessoryName) => {
            const accessoryId = createAccessoryId(accessoryName)
            traitAccessoryDeferred.set(
                accessoryId,
                ctx.esm.prepare(Trait, accessoryId),
            )
        })
    }
    ctx.queue.enqueue(async () => {
        ctx.log.debug(
            `[cryptopunks] Assign: to:${event.to} punkIndex: ${event.punkIndex} logIndex: ${log.logIndex}`,
        )
        let toAccount = toAccountDeferred.get()
        if (!toAccount) {
            toAccount = instantiateAccount(toId)
            ctx.esm.saveForId(toAccount)
        }
        let contract = contractDeferred.get()
        if (!contract) {
            contract = await fetchCryptoPunkContract(
                ctx,
                log.block,
                log.address.toLowerCase(),
            )
            ctx.esm.saveForId(contract)
        }
        const punk = instantiatePunk(event.punkIndex, toAccount, contract)
        ctx.esm.saveForId(punk, ['contract'])
        const metaData = instantiateMetaData(punk)
        ctx.esm.saveForId(metaData)
        punk.metadata = metaData
        punk.assignedTo = toAccount
        punk.transferedTo = toAccount
        //Assign is always the first EVENTS that actually creates the punk
        const assign = instantiateAssign(log, toAccount, punk, contract)
        if (trait) {
            let traitType = traitTypeDeferred?.get()
            if (!traitType) {
                traitType = new Trait({
                    id: trait.type,
                    type: TraitType.TYPE,
                    numberOfNfts: 0n,
                })
            }
            traitType.numberOfNfts++
            ctx.esm.save(traitType)
            ctx.esm.save(instantiateMetaDataTrait(metaData, traitType))
            trait.accessories.forEach((accessoryName) => {
                const accessoryId = createAccessoryId(accessoryName)
                let accessory = traitAccessoryDeferred.get(accessoryId)?.get()
                if (!accessory) {
                    accessory = new Trait({
                        id: accessoryId,
                        type: TraitType.ACCESSORY,
                        numberOfNfts: 0n,
                    })
                }
                accessory.numberOfNfts++
                ctx.esm.save(accessory)
                ctx.esm.save(instantiateMetaDataTrait(metaData, accessory))
            })
        }

        //Update account punk holdings
        toAccount.numberOfPunksOwned++
        toAccount.numberOfPunksAssigned++
        //Write
        ctx.esm.save(toAccount)
        ctx.esm.save(punk)
        ctx.esm.save(assign)
        ctx.esm.save(contract)
        ctx.esm.save(metaData)
    })
}

mapping.handlers.handlePunkTransfer = (ctx, log, event) => {
    const fromId = event.from.toLowerCase()
    const toId = event.to.toLowerCase()
    const fromAccountDeferred = ctx.esm.prepare(Account, fromId)
    const toAccountDeferred = ctx.esm.prepare(Account, toId)
    const fromProxyDeferred = ctx.esm.prepare(UserProxy, fromId)
    const toProxyDeferred = ctx.esm.prepare(UserProxy, toId)
    const punkDeferred = ctx.esm.prepare(Punk, event.punkIndex.toString(), {
        ...defaultPunkRelations,
    })
    const transferDeferred = ctx.esm.prepare(
        Transfer,
        event.punkIndex.toString(),
    )
    const contractDeferred = ctx.esm.prepare(
        Contract,
        log.address.toLowerCase(),
    )
    ctx.queue.enqueue(async () => {
        ctx.log.debug(
            `[cryptopunks] PunkTransfer: from: ${event.from} to:${event.to} punkIndex: ${event.punkIndex} logIndex: ${log.logIndex}`,
        )

        let contract = contractDeferred.get()
        if (!contract) {
            contract = await fetchCryptoPunkContract(
                ctx,
                log.block,
                log.address.toLowerCase(),
            )
            ctx.esm.saveForId(contract)
        }
        let toProxy = toProxyDeferred.get()
        if (toProxy) {
            ctx.log.debug(
                `PunkTransfer to proxy detected toProxy: ${toProxy.id}`,
            )
            return
        }
        let toAccount = toAccountDeferred.get()
        if (!toAccount) {
            toAccount = instantiateAccount(toId)
            ctx.esm.saveForId(toAccount)
        }
        let fromAccount = fromAccountDeferred.get()
        if (!fromAccount) {
            fromAccount = instantiateAccount(fromId)
            ctx.esm.saveForId(fromAccount)
        }

        if (fromId !== WRAPPED_PUNK_ADDRESS && toId !== WRAPPED_PUNK_ADDRESS) {
            ctx.log.debug(`Regular punk transfer check: ${event.punkIndex}`)
            const punk = punkDeferred.get()
            if (!punk) {
                ctx.log.error(
                    `PunkTransfer: Punk not found: ${event.punkIndex}`,
                )
                return
            }
            punk.numberOfTransfers++

            let transfer = transferDeferred.get()
            if (!transfer) {
                transfer = instantiateTransfer(log, contract)
                transfer.from = fromAccount
                transfer.to = toAccount
                transfer.nft = punk
            }

            //We close the oldBid if the bidder was transfered the punk
            let oldBid = punk.currentBid
            if (oldBid && oldBid.from == toAccount) {
                oldBid.created = punk.currentBidCreated
                oldBid.open = false
                ctx.esm.save(oldBid)
            }

            updateAccountHoldings(toAccount, fromAccount)
            toAccount.numberOfTransfers++
            fromAccount.numberOfTransfers++

            //Capture punk transfers and owners if not transfered to WRAPPED PUNK ADDRESS
            punk.owner = toAccount

            //Write
            ctx.esm.save(transfer)
            ctx.esm.save(toAccount)
            ctx.esm.save(fromAccount)
            ctx.esm.save(punk)
            ctx.esm.save(contract)
            return
        }

        const fromProxy = fromProxyDeferred.get()
        if (
            fromProxy &&
            fromAccount.id == fromProxy.id &&
            toAccount.id == WRAPPED_PUNK_ADDRESS
        ) {
            ctx.log.debug(`Wrap detected of punk: ${event.punkIndex}`)
            const punk = punkDeferred.get()
            if (!punk) {
                ctx.log.error(
                    `PunkTransfer: Punk not found: ${event.punkIndex}`,
                )
                return
            }
            punk.wrapped = true
            ctx.esm.save(punk)
            return
        }

        if (fromAccount.id == WRAPPED_PUNK_ADDRESS) {
            //Burn/Unwrap
            ctx.log.debug(
                `Unwrapped detected. From: ${fromAccount.id}, punk: ${event.punkIndex}`,
            )

            const punk = punkDeferred.get()
            if (!punk) {
                ctx.log.error(
                    `PunkTransfer: Punk not found: ${event.punkIndex}`,
                )
                return
            }
            punk.wrapped = true
            ctx.esm.save(punk)
        }
    })
}

mapping.handlers.handleTransfer = (ctx, log, event) => {
    const toId = event.to.toLowerCase()
    if (toId === ZERO_ADDRESS) {
        return
    }
    ctx.transferRecorder.recordTransfer(log)
    const fromId = event.from.toLowerCase()
    const fromAccountDeferred = ctx.esm.prepare(Account, fromId)
    const toAccountDeferred = ctx.esm.prepare(Account, toId)
    ctx.queue.enqueue(() => {
        ctx.log.debug(
            `[cryptopunks] Transfer: from: ${event.from} to:${event.to} value: ${event.value} logIndex: ${log.logIndex}`,
        )

        let toAccount = toAccountDeferred.get()
        if (!toAccount) {
            toAccount = instantiateAccount(toId)
            ctx.esm.saveForId(toAccount)
        }
        let fromAccount = fromAccountDeferred.get()
        if (!fromAccount) {
            fromAccount = instantiateAccount(fromId)
            ctx.esm.saveForId(fromAccount)
        }

        const cToken = instantiateCToken(log, fromAccount, toAccount)
        ctx.log.debug(`New cToken saved: ${cToken.id}`)
        ctx.esm.save(cToken)
        cToken.amount = event.value

        //Write
        ctx.esm.save(cToken)
        ctx.esm.save(toAccount)
        ctx.esm.save(fromAccount)
    })
}

mapping.handlers.handlePunkOffered = (ctx, log, event) => {
    const toId = event.toAddress.toLowerCase()
    const toAccountDeferred = ctx.esm.prepare(Account, toId)
    const punkDeferred = ctx.esm.prepare(Punk, event.punkIndex.toString(), {
        ...defaultPunkRelations,
    })
    ctx.queue.enqueue(() => {
        ctx.log.debug(
            `[cryptopunks] PunkOffered: minValue: ${event.minValue} toAddress:${event.toAddress} ` +
                `punkIndex: ${event.punkIndex} logIndex: ${log.logIndex}`,
        )
        let toAccount = toAccountDeferred.get()
        if (!toAccount) {
            toAccount = instantiateAccount(toId)
            ctx.esm.saveForId(toAccount)
        }
        const punk = punkDeferred.get()
        if (!punk) {
            ctx.log.error(`PunkOffered: Punk not found: ${event.punkIndex}`)
            return
        }
        closeOldAsk(ctx, punk, punk.owner)
        const askCreated = instantiateAskCreated(punk, log)
        ctx.esm.saveForId(askCreated)
        const ask = instantiateAsk(punk.owner, log)
        ctx.esm.saveForId(ask)

        ask.nft = punk
        ask.from = punk.owner
        ask.amount = event.minValue
        ask.created = askCreated
        ask.open = true

        askCreated.to = toAccount
        askCreated.from = punk.owner
        askCreated.amount = event.minValue
        askCreated.ask = ask
        punk.currentAskCreated = askCreated
        punk.currentAsk = ask
        ctx.esm.save(askCreated)
        ctx.esm.save(ask)
        ctx.esm.save(punk)

        if (log.block.height > MINIMUM_BLOCK_HEIGHT_TO_SEND_NOTIFICATION) {
            handleAskNotification(ctx, punk, punk.owner, event.minValue, log)
        }
    })
}

/**
 * @summary This event first only fires when a bid is created
 * @description:
 * - createBidCreatedEVENT
 * - create Bid
 * - create relationship between Bid and BidCreated to provide information on creation EVENT
 */

mapping.handlers.handlePunkBidEntered = (ctx, log, event) => {
    const fromId = event.fromAddress.toLowerCase()
    const fromAccountDeferred = ctx.esm.prepare(Account, fromId)
    const punkDeferred = ctx.esm.prepare(Punk, event.punkIndex.toString(), {
        ...defaultPunkRelations,
    })
    ctx.queue.enqueue(() => {
        ctx.log.debug(
            `[cryptopunks] PunkBidEntered: punkIndex: ${event.punkIndex} from:${event.fromAddress} value: ${event.value} logIndex: ${log.logIndex}`,
        )
        const punk = punkDeferred.get()
        if (!punk) {
            ctx.log.error(`PunkBidEntered: Punk not found: ${event.punkIndex}`)
            return
        }

        let fromAccount = fromAccountDeferred.get()
        if (!fromAccount) {
            fromAccount = instantiateAccount(fromId)
            ctx.esm.saveForId(fromAccount)
            ctx.esm.save(fromAccount)
        }

        const bid = instantiateBid(fromAccount, log)
        ctx.esm.saveForId(bid)
        const bidCreated = instantiateBidCreated(punk, fromAccount, log)
        ctx.esm.saveForId(bidCreated)

        bid.amount = event.value
        bid.nft = punk
        bid.from = fromAccount
        bid.created = bidCreated

        punk.currentBid = bid

        bidCreated.bid = bid
        bidCreated.amount = event.value

        punk.currentBidCreated = bidCreated

        //Write
        ctx.esm.save(bidCreated)
        ctx.esm.save(bid)
        ctx.esm.save(punk)

        if (log.block.height > MINIMUM_BLOCK_HEIGHT_TO_SEND_NOTIFICATION) {
            handleBidNotification(ctx, punk, fromAccount, event.value, log)
        }
    })
}
mapping.handlers.handlePunkBidWithdrawn = (ctx, log, event) => {
    const fromId = event.fromAddress.toLowerCase()
    const fromAccountDeferred = ctx.esm.prepare(Account, fromId)
    const punkDeferred = ctx.esm.prepare(Punk, event.punkIndex.toString(), {
        ...defaultPunkRelations,
    })
    ctx.queue.enqueue(() => {
        ctx.log.debug(
            `[cryptopunks] PunkBidWithdrawn: punkIndex: ${event.punkIndex} from:${event.fromAddress} ` +
                `value: ${event.value} logIndex: ${log.logIndex}`,
        )
        const punk = punkDeferred.get()
        if (!punk) {
            ctx.log.error(
                `PunkBidWithdrawn: Punk not found: ${event.punkIndex}`,
            )
            return
        }
        let fromAccount = fromAccountDeferred.get()
        if (!fromAccount) {
            fromAccount = instantiateAccount(fromId)
            ctx.esm.saveForId(fromAccount)
        }

        if (!punk.currentBid) {
            return
        }
        const bidRemoved = instantiateBidRemoved(
            punk,
            fromAccount,
            log,
            punk.currentBid,
        )
        bidRemoved.amount = event.value
        bidRemoved.nft = punk
        ctx.esm.saveForId(bidRemoved, [], true)
        punk.currentBidRemoved = bidRemoved
        if (punk.currentBid) {
            const oldBid = punk.currentBid
            oldBid.created = punk.currentBidCreated
            oldBid.from = fromAccount
            oldBid.open = false
            oldBid.removed = bidRemoved
            bidRemoved.bid = oldBid
            ctx.esm.save(oldBid)
            ctx.esm.save(bidRemoved)
        }
        ctx.esm.save(punk)
    })
}

mapping.handlers.handlePunkBought = (ctx, log, event) => {
    const fromId = event.fromAddress.toLowerCase()
    const toId = event.toAddress.toLowerCase()
    const fromAccountDeferred = ctx.esm.prepare(Account, fromId)
    const punkDeferred = ctx.esm.prepare(Punk, event.punkIndex.toString(), {
        ...defaultPunkRelations,
    })
    const contractDeferred = ctx.esm.prepare(
        Contract,
        log.address.toLowerCase(),
    )

    ctx.queue.enqueue(async () => {
        ctx.log.debug(
            `[cryptopunks] PunkBought: punkIndex: ${event.punkIndex} from:${event.fromAddress} ` +
                `to: ${event.toAddress} value: ${event.value} logIndex: ${log.logIndex}`,
        )
        const punk = punkDeferred.get()
        if (!punk) {
            ctx.log.error(`PunkBidEntered: Punk not found: ${event.punkIndex}`)
            return
        }
        const cToken = lookupCachedCToken(ctx, log)
        if (!cToken) {
            ctx.log.error(`PunkBought: CToken not found: ${event.punkIndex}`)
            return
        }
        const owner = ctx.esm.lookupCache(Account, cToken.owner)
        if (!owner) {
            ctx.log.error(`PunkBought: Owner not found: ${event.punkIndex}`)
            return
        }
        let fromAccount = fromAccountDeferred.get()
        if (!fromAccount) {
            fromAccount = instantiateAccount(fromId)
            ctx.esm.saveForId(fromAccount)
        }
        let contract = contractDeferred.get()
        if (!contract) {
            contract = await fetchCryptoPunkContract(
                ctx,
                log.block,
                log.address.toLowerCase(),
            )
            ctx.esm.saveForId(contract)
        }
        const toAccount = cToken.to
        const sale = instantiateSale(punk, fromAccount, log)
        if (toId === ZERO_ADDRESS) {
            /**
             * transfer event -> here
             *
             * @summary
             * 	- Logic for tracking acceptBidForPunk(), BidAccepted
             * 		e.g https://etherscan.io/tx/0x23d6e24628dabf4fa92fa93630e5fa6f679fac75071aab38d7e307a3c0f4a3ca#eventlog
             *
             *    @description:
             * 	- createBidRemovedEvent
             * 	- close Old Bid only if bidder is the buyer
             * 	- close Old Ask since it has been sold
             * 	- createSaleEvent
             * 	- update aggregates for Account, Contract and Punk
             */
            closeOldAsk(ctx, punk, owner)
            if (punk.currentBid) {
                const oldBid = punk.currentBid
                if (oldBid.from.id === toAccount.id) {
                    const bidRemoved = instantiateBidRemoved(
                        punk,
                        fromAccount,
                        log,
                        punk.currentBid,
                    )
                    ctx.esm.saveForId(bidRemoved, [], true)
                    punk.currentBidRemoved = bidRemoved
                    oldBid.created = punk.currentBidCreated
                    oldBid.removed = bidRemoved
                    oldBid.nft = punk
                    oldBid.open = false
                    ctx.esm.save(oldBid)
                }
                updateSale(sale, oldBid.amount, owner)
                updateAccountAggregates(fromAccount, toAccount, oldBid.amount)
                updatePunkSaleAggregates(punk, oldBid.amount)
                updateContractAggregates(contract, oldBid.amount)
                if (
                    log.block.height > MINIMUM_BLOCK_HEIGHT_TO_SEND_NOTIFICATION
                ) {
                    handleSaleNotification(
                        ctx,
                        punk,
                        toAccount,
                        oldBid.amount,
                        log,
                    )
                }
            } else {
                ctx.log.debug('no current bid')
            }
            updatePunkOwner(punk, owner)
            updateAccountHoldings(toAccount, fromAccount)
        } else {
            // regular trade
            // transfer event -> no longer for sale event -> here
            updateSale(sale, event.value, toAccount)
            closeOldBid(ctx, punk, toAccount)
            closeOldAsk(ctx, punk, fromAccount)
            updatePunkOwner(punk, toAccount)
            updatePunkSaleAggregates(punk, event.value)
            updateContractAggregates(contract, event.value)
            updateAccountHoldings(toAccount, fromAccount)
            updateAccountAggregates(fromAccount, toAccount, event.value)
            if (log.block.height > MINIMUM_BLOCK_HEIGHT_TO_SEND_NOTIFICATION) {
                handleSaleNotification(ctx, punk, toAccount, event.value, log)
            }
        }

        //Write
        ctx.esm.save(sale)
        ctx.esm.save(punk)
        ctx.esm.save(fromAccount)
        ctx.esm.save(toAccount)
        ctx.esm.save(contract)
    })
}

mapping.handlers.handlePunkNoLongerForSale = async (ctx, log, event) => {
    ctx.transferRecorder.recordPunkNoLongerForSale(log)
    const punkDeferred = ctx.esm.prepare(Punk, event.punkIndex.toString(), {
        ...defaultPunkRelations,
    })
    ctx.queue.enqueue(() => {
        ctx.log.debug(
            `[cryptopunks] PunkNoLongerForSale: punkIndex: ${event.punkIndex} logIndex: ${log.logIndex}`,
        )
        const punk = punkDeferred.get()
        if (!punk) {
            ctx.log.error(
                `PunkNoLongerForSale: Punk not found: ${event.punkIndex}`,
            )
            return
        }
        if (punk.currentAsk) {
            const askRemoved = instantiateAskRemoved(punk, log, punk.currentAsk)
            ctx.esm.saveForId(askRemoved)
            const oldAsk = punk.currentAsk
            oldAsk.removed = askRemoved
            oldAsk.created = punk.currentAskCreated
            oldAsk.nft = punk
            oldAsk.open = false
            oldAsk.from = punk.owner
            punk.currentAskRemoved = askRemoved
            ctx.esm.save(oldAsk)
            ctx.esm.save(punk)
            return
        }
        //https://cryptopunks.app/cryptopunks/details/2158
        //This is a weird case where an offer can be withdrawn before it's created
        const ask = instantiateAsk(punk.owner, log)
        ctx.esm.saveForId(ask)
        const askRemoved = instantiateAskRemoved(punk, log, ask)
        ctx.esm.saveForId(askRemoved)

        ask.nft = punk
        ask.open = false
        ask.removed = askRemoved
        ask.from = punk.owner
        //Amount is 0 because this field is non-nullable & this basically initializes the field so it doesn't fail.
        //Also, this event doesn't emit the amount.
        ask.amount = 0n
        askRemoved.amount = 0n
        askRemoved.ask = ask

        ctx.esm.saveForId(ask, ['removed', 'nft'])
        ctx.esm.save(ask)
        ctx.esm.save(askRemoved)
        ctx.esm.save(punk)
    })
}
export default mapping
