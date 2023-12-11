import * as abi from '../abi/wrappedpunks'
import {ZERO_ADDRESS} from './share/constants'
import {Account, Contract, Punk, Transfer, UserProxy} from '../model'
import {createMapping} from './share/mapper'
import {hexToByteArray, instantiate} from '../utils'
import {
    createTransfer,
    createUnwrap,
    createWrap,
    getTransferId,
    instantiateAccount,
    instantiateCToken,
    updateAccountHoldings,
} from './share/entitites'
import {defaultPunkRelations} from './share/relations'
import {fetchWrappedPunkContract} from './share/contracts'

const mapping = createMapping(abi, '0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6')

mapping.startBlock = 10821736

mapping.handlers.handleTransfer = (ctx, log, event) => {
    ctx.transferRecorder.recordTransfer(log)
    const fromId = event.from.toLowerCase()
    const toId = event.to.toLowerCase()
    const contractDeferred = ctx.esm.prepare(
        Contract,
        log.address.toLowerCase(),
    )
    const punkDeferred = ctx.esm.prepare(Punk, event.tokenId.toString(), {
        ...defaultPunkRelations,
    })
    const fromAccountDeferred = ctx.esm.prepare(Account, fromId)
    const toAccountDeferred = ctx.esm.prepare(Account, toId)
    const isWrappedPunkTransfer =
        fromId !== ZERO_ADDRESS && toId !== ZERO_ADDRESS
    const transferDeferred = isWrappedPunkTransfer
        ? ctx.esm.prepare(Transfer, getTransferId(log))
        : undefined

    ctx.queue.enqueue(async () => {
        ctx.log.debug(
            `[WrappedPunks] Transfer ${event.from} -> ${event.to} ${event.tokenId}`,
        )
        let contract = contractDeferred.get()
        if (!contract) {
            contract = await fetchWrappedPunkContract(
                ctx,
                log.block,
                log.address.toLowerCase(),
            )
            ctx.esm.save(contract)
        }
        const punk = punkDeferred.get()
        if (!punk) {
            ctx.log.error(
                `[WrappedPunks] Transfer ${event.from} -> ${event.to} ${event.tokenId} but punk not found`,
            )
            return
        }
        let fromAccount = fromAccountDeferred.get()
        if (!fromAccount) {
            fromAccount = instantiateAccount(fromId)
            ctx.esm.saveForId(fromAccount)
            ctx.esm.save(fromAccount)
        }
        let toAccount = toAccountDeferred.get()
        if (!toAccount) {
            toAccount = instantiateAccount(toId)
            ctx.esm.saveForId(toAccount)
            ctx.esm.save(toAccount)
        }
        if (fromId === ZERO_ADDRESS) {
            // A wrapped punk is minted (wrapped)
            const wrap = createWrap(fromAccount, punk, log)
            contract.totalSupply++
            wrap.to = toAccount
            ctx.esm.save(wrap)
            ctx.esm.save(contract)
        } else if (toId === ZERO_ADDRESS) {
            // A wrapped punk is burned (unwrapped)
            const unwrap = createUnwrap(fromAccount, toAccount, punk, log)
            contract.totalSupply--
            ctx.esm.save(unwrap)
            ctx.esm.save(contract)
        } else {
            // Wrapped Punk Transfer
            // We do not want to save a transfer for wrapped punk mints/burns
            let transfer = transferDeferred!.get()
            if (!transfer) {
                transfer = createTransfer(contract, log)
                ctx.esm.save(transfer)
            }
            transfer.from = fromAccount
            transfer.to = toAccount
            transfer.nft = punk

            const cToken = instantiateCToken(log, fromAccount, toAccount)
            ctx.log.debug(`New cToken saved: ${cToken.id}`)
            ctx.esm.save(cToken)
            cToken.from = fromAccount
            cToken.to = toAccount
            cToken.owner = toAccount.id
            cToken.punkId = event.tokenId.toString()
            // We need the contract address to filter our transactions
            // from other marketplace(OpenSea, RaribleExchangeV1, ERC721Sale) sales
            cToken.referenceId = log.address.toLowerCase()

            updateAccountHoldings(toAccount, fromAccount)
            punk.owner = toAccount
            punk.numberOfTransfers++

            //Write
            ctx.esm.save(fromAccount)
            ctx.esm.save(toAccount)
            ctx.esm.save(punk)
            ctx.esm.save(transfer)
            ctx.esm.save(cToken)
        }
    })
}

mapping.handlers.handleProxyRegistered = (ctx, log, event) => {
    const userDeferred = ctx.esm.prepare(Account, event.user.toLowerCase())
    ctx.queue.enqueue(async () => {
        let user = userDeferred.get()
        if (!user) {
            user = instantiateAccount(event.user.toLowerCase())
            ctx.esm.saveForId(user)
            ctx.esm.save(user)
        }
        ctx.esm.save(
            instantiate(UserProxy, {
                id: event.proxy.toLowerCase(),
                user,
                timestamp: BigInt(log.block.timestamp / 1000),
                txHash: hexToByteArray(log.transaction!.hash),
                blockNumber: BigInt(log.block.height),
                blockHash: hexToByteArray(log.block.hash),
            }),
        )
    })
}
export default mapping
