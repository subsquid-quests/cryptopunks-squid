import * as abi from '../abi/RaribleExchangeV1'
import {createMapping} from './share/mapper'
import {handleAltMarketBuy} from './share/handleAltMarketBuy'

const mapping = createMapping(abi, '0xcd4ec7b66fbc029c116ba9ffb3e59351c20b5b06')

mapping.startBlock = 11274515
mapping.filters = {
    handleBuy: (ctx, log) => {
        return ctx.transferRecorder.hasAssociatedCToken(log)
    },
}

export function calcRaribleComissionFee(price: bigint): bigint {
    return BigInt(Math.floor(Number(price) * 0.025))
}

/**
 * @summary Logic for validating a bidAccepted sale
 * @description
 * A wrapped punk bid can be accepted on RaribleExchangeV1.
 * 	- Example: https://etherscan.io/tx/0x26ad41d72737442ef108460bc25a69764b30e3df96344d95f8f3a03a551fd787#eventlog
 * 	- We know this through the buyer address.
 *     - The major difference between this sale and a regular sale is that
 *         - the owner address in Ordermatched becomes the buyer --> (toAccount)
 *         - the seller address becomes the buyer --> (fromAccount)
 * 	- RaribleExchangeV1 takes 2.5% fee on all bids accepted transactions so we need to remove that to get the actual sale price
 */
mapping.handlers.handleBuy = (ctx, log, event) => {
    const sellerId = event.owner.toLowerCase()
    const buyerId = event.buyer.toLowerCase()
    handleAltMarketBuy(
        ctx,
        log,
        'RaribleExchangeV1',
        sellerId,
        buyerId,
        event.buyValue,
    )
}

export default mapping
