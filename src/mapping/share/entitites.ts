import {CONTRACT_URI, TOKEN_URI} from './constants'
import {
    Account,
    Ask,
    AskCreated,
    AskRemoved,
    Assign,
    Bid,
    BidCreated,
    BidRemoved,
    CToken,
    Contract,
    EventType,
    MetaData,
    MetaDataTrait,
    OfferType,
    Punk,
    Sale,
    Trait,
    Transfer,
    Unwrap,
    Wrap,
} from '../../model'
import {CtxWithCache, Log} from '../../processor'
import {hexToByteArray, instantiate} from '../../utils'

export function instantiateAccount(address: string): Account {
    const url = `https://cryptopunks.app/cryptopunks/accountinfo?account=${address}`
    return instantiate(Account, {
        id: address,
        numberOfPunksOwned: 0n,
        numberOfSales: 0n,
        totalEarned: 0n,
        numberOfTransfers: 0n,
        numberOfPunksAssigned: 0n,
        numberOfPurchases: 0n,
        totalSpent: 0n,
        averageAmountSpent: 0n,
        accountUrl: url,
    })
}

export function instantiateMetaDataTrait(metaData: MetaData, trait: Trait) {
    const mt = instantiate(MetaDataTrait, {
        id: `${metaData.id}-${trait.id}`,
        metaData,
        trait,
    })
    return mt
}

export function instantiateMetaData(punk: Punk) {
    const punkId = BigInt(punk.id)
    const metadata = instantiate(MetaData, {
        id: punk.id,
        tokenURI: `${TOKEN_URI}${punk.id}`,
        contractURI: CONTRACT_URI,
        tokenId: punkId,
        punk: punk,
    })
    return metadata
}

export function instantiatePunk(
    tokenId: bigint,
    owner: Account,
    contract: Contract,
): Punk {
    let punk = instantiate(Punk, {
        id: tokenId.toString(), // like "1", "2", ...
        wrapped: false,
        tokenId: tokenId,
        owner: owner,
        numberOfTransfers: 0n,
        numberOfSales: 0n,
        totalAmountSpentOnPunk: 0n,
        averageSalePrice: 0n,
        contract,
    })
    return punk
}

export function updatePunkSaleAggregates(punk: Punk, price: bigint): void {
    //Update punk aggregates
    punk.totalAmountSpentOnPunk += price
    punk.numberOfSales++

    //We only calculate average sale price if there are more than 0 sales so we don't divide by 0
    if (punk.numberOfSales != 0n) {
        punk.averageSalePrice = punk.totalAmountSpentOnPunk / punk.numberOfSales
    }
}

export function updatePunkOwner(punk: Punk, toAccount: Account): void {
    //Update Punk entity
    punk.purchasedBy = toAccount
    punk.owner = toAccount
}

export function updateContractAggregates(contract: Contract, price: bigint) {
    //Update contract aggregates
    contract.totalSales++
    contract.totalAmountTraded = contract.totalAmountTraded + price
}

export function instantiateAssign(
    log: Log,
    toAccount: Account,
    punk: Punk,
    contract: Contract,
) {
    const assign = instantiate(Assign, {
        id: getGlobalId(log),
        to: toAccount,
        nft: punk,
        timestamp: BigInt(log.block.timestamp / 1000),
        contract,
        blockNumber: BigInt(log.block.height),
        logNumber: BigInt(log.logIndex),
        txHash: hexToByteArray(log.transaction!.hash),
        blockHash: hexToByteArray(log.block.hash),
        type: EventType.ASSIGN,
    })
    return assign
}

export function instantiateTransfer(log: Log, contract: Contract) {
    const transfer = instantiate(Transfer, {
        id: getGlobalId(log).concat('-TRANSFER'),
        timestamp: BigInt(log.block.timestamp / 1000),
        contract,
        blockNumber: BigInt(log.block.height),
        logNumber: BigInt(log.logIndex),
        txHash: hexToByteArray(log.transaction!.hash),
        type: EventType.TRANSFER,
        blockHash: hexToByteArray(log.block.hash),
    })
    return transfer
}

export function getCTokenId(log: Log): string {
    return getGlobalId(log)
}

export function instantiateCToken(
    log: Log,
    fromAccount: Account,
    toAccount: Account,
): CToken {
    const id = getCTokenId(log)
    const cToken = instantiate(CToken, {
        id,
        referenceId: id,
        blockNumber: BigInt(log.block.height),
        blockHash: hexToByteArray(log.block.hash),
        txHash: hexToByteArray(log.transaction!.hash),
        timestamp: BigInt(log.block.timestamp / 1000),
        from: fromAccount,
        to: toAccount,
        owner: toAccount.id,
    })
    return cToken
}

export function instantiateAskCreated(punk: Punk, log: Log): AskCreated {
    return instantiate(AskCreated, {
        id: getGlobalId(log).concat('-ASK_CREATED'),
        type: EventType.ASK_CREATED,
        nft: punk,
        logNumber: BigInt(log.logIndex),
        timestamp: BigInt(log.block.timestamp / 1000),
        blockNumber: BigInt(log.block.height),
        txHash: hexToByteArray(log.transaction!.hash),
        blockHash: hexToByteArray(log.block.hash),
        contract: punk.contract,
    })
}

export function instantiateAskRemoved(
    punk: Punk,
    log: Log,
    ask: Ask,
): AskRemoved {
    return instantiate(AskRemoved, {
        id: getGlobalId(log).concat('-ASK_REMOVED'),
        type: EventType.ASK_REMOVED,
        nft: punk,
        logNumber: BigInt(log.logIndex),
        timestamp: BigInt(log.block.timestamp / 1000),
        blockNumber: BigInt(log.block.height),
        txHash: hexToByteArray(log.transaction!.hash),
        blockHash: hexToByteArray(log.block.hash),
        contract: punk.contract,
        ask,
    })
}

export function getAskId(log: Log): string {
    return getGlobalId(log).concat('-ASK')
}

export function instantiateAsk(fromAccount: Account, log: Log): Ask {
    const askId = getAskId(log)
    return instantiate(Ask, {
        id: askId,
        from: fromAccount,
        offerType: OfferType.ASK,
        open: true,
        amount: 0n,
    })
}

export function closeOldAsk(
    ctx: CtxWithCache,
    punk: Punk,
    fromAccount: Account,
) {
    const oldAsk = punk.currentAsk
    if (!oldAsk) {
        return
    }
    oldAsk.removed = punk.currentAskRemoved
    oldAsk.open = false
    oldAsk.created = punk.currentAskCreated //we opened the Punk in PunkOffered() and saved the currentAskCreated to a field in the Punk entity
    oldAsk.from = fromAccount
    ctx.esm.save(oldAsk)
}

export function getBidId(log: Log): string {
    return getGlobalId(log).concat('-BID')
}

//Update the state of the last Bid
export function instantiateBid(fromAccount: Account, log: Log): Bid {
    const bidId = getBidId(log)
    return instantiate(Bid, {
        id: bidId,
        offerType: OfferType.BID,
        open: true,
        amount: 0n,
        from: fromAccount,
    })
}

//Record a new BidCreated EVENT anytime we observe one
export function instantiateBidCreated(
    punk: Punk,
    fromAccount: Account,
    log: Log,
) {
    return instantiate(BidCreated, {
        id: getGlobalId(log).concat('-BID_CREATED'),
        type: EventType.BID_CREATED,
        nft: punk,
        logNumber: BigInt(log.logIndex),
        timestamp: BigInt(log.block.timestamp / 1000),
        blockNumber: BigInt(log.block.height),
        txHash: hexToByteArray(log.transaction!.hash),
        blockHash: hexToByteArray(log.block.hash),
        contract: punk.contract,
        from: fromAccount,
    })
}

//Record a new BidRemoved event anytime we observe one
export function instantiateBidRemoved(
    punk: Punk,
    fromAccount: Account,
    log: Log,
    bid: Bid,
): BidRemoved {
    return instantiate(BidRemoved, {
        id: getGlobalId(log).concat('-BID_REMOVED'),
        type: EventType.BID_REMOVED,
        nft: punk,
        logNumber: BigInt(log.logIndex),
        timestamp: BigInt(log.block.timestamp / 1000),
        blockNumber: BigInt(log.block.height),
        txHash: hexToByteArray(log.transaction!.hash),
        blockHash: hexToByteArray(log.block.hash),
        contract: punk.contract,
        from: fromAccount,
        bid,
    })
}

export function closeOldBid(
    ctx: CtxWithCache,
    punk: Punk,
    toAccount: Account,
): void {
    const oldBid = punk.currentBid
    if (!oldBid) {
        return
    }
    if (oldBid.from.id !== toAccount.id) {
        return
    }
    oldBid.open = false
    oldBid.created = punk.currentBidCreated
    ctx.esm.save(oldBid)
}

export function getSaleId(log: Log) {
    return getGlobalId(log).concat('-SALE')
}
export function instantiateSale(
    punk: Punk,
    fromAccount: Account,
    log: Log,
): Sale {
    return instantiate(Sale, {
        id: getSaleId(log),
        contract: punk.contract,
        timestamp: BigInt(log.block.timestamp / 1000),
        blockNumber: BigInt(log.block.height),
        txHash: hexToByteArray(log.transaction!.hash),
        logNumber: BigInt(log.logIndex),
        blockHash: hexToByteArray(log.block.hash),
        type: EventType.SALE,
        from: fromAccount,
        nft: punk,
    })
}

export function updateSale(sale: Sale, price: bigint, buyer: Account): void {
    sale.amount = price
    sale.to = buyer
}

export function getGlobalId(log: Log) {
    return `${log.transaction!.hash}-${log.logIndex}`
}

export function getGlobalIdWithOffset(log: Log, offset: number) {
    return `${log.transaction!.hash}-${log.logIndex - offset}`
}

export function lookupCachedCToken(ctx: CtxWithCache, log: Log) {
    // log index of the ctoken is within 2
    // pattern 1. Transfer -> PunkBought
    // pattern 2. Transfer -> PunkNoLongerForSale -> PunkBought
    const id = ctx.transferRecorder.getAssociatedCTokenId(log)
    return id ? ctx.esm.lookupCache(CToken, id) : undefined
}

export function updateAccountAggregates(
    fromAccount: Account,
    toAccount: Account,
    price: bigint,
): void {
    //Update fromAccount aggregates
    fromAccount.numberOfSales++
    fromAccount.totalEarned += price

    //Update toAccount aggregates
    toAccount.totalSpent = toAccount.totalSpent + price
    toAccount.numberOfPurchases++

    //We only calculate average amount spent if there are more than 0 purchases so we don't divide by 0
    if (toAccount.numberOfPurchases != 0n) {
        toAccount.averageAmountSpent =
            toAccount.totalSpent / toAccount.numberOfPurchases
    }
}

export function updateAccountHoldings(
    toAccount: Account,
    fromAccount: Account,
): void {
    //Update toAccount holdings
    toAccount.numberOfPunksOwned++

    //Update fromAccount holdings
    fromAccount.numberOfPunksOwned--
}

export function getWrapId(log: Log): string {
    return log.transaction!.hash.concat('-').concat(log.logIndex.toString())
}

export function getUnWrapId(log: Log): string {
    return getWrapId(log)
}

export function createWrap(fromAccount: Account, nft: Punk, log: Log) {
    return instantiate(Wrap, {
        id: getWrapId(log),
        from: fromAccount,
        type: EventType.WRAP,
        timestamp: BigInt(log.block.timestamp / 1000),
        nft,
        blockNumber: BigInt(log.block.height),
        logNumber: BigInt(log.logIndex),
        blockHash: hexToByteArray(log.block.hash),
        txHash: hexToByteArray(log.transaction!.hash),
    })
}

export function createUnwrap(
    fromAccount: Account,
    toAccount: Account,
    nft: Punk,
    log: Log,
): Unwrap {
    return instantiate(Unwrap, {
        id: getUnWrapId(log),
        from: fromAccount,
        to: toAccount,
        type: EventType.UNWRAP,
        timestamp: BigInt(log.block.timestamp / 1000),
        nft,
        blockNumber: BigInt(log.block.height),
        logNumber: BigInt(log.logIndex),
        blockHash: hexToByteArray(log.block.hash),
        txHash: hexToByteArray(log.transaction!.hash),
    })
}

export function getTransferId(log: Log): string {
    return getGlobalId(log).concat('-TRANSFER')
}

export function createTransfer(contract: Contract, log: Log): Transfer {
    return instantiate(Transfer, {
        id: getGlobalId(log).concat('-TRANSFER'),
        timestamp: BigInt(log.block.timestamp / 1000),
        contract: contract,
        blockNumber: BigInt(log.block.height),
        logNumber: BigInt(log.logIndex),
        txHash: hexToByteArray(log.transaction!.hash),
        type: EventType.TRANSFER,
        blockHash: hexToByteArray(log.block.hash),
    })
}

export function createAccessoryId(accessoryName: string) {
    return accessoryName.split(' ').join('-')
}
