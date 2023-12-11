import * as abi from '../abi/ERC721Sale'
import {createMapping} from './share/mapper'
import {handleAltMarketBuy} from './share/handleAltMarketBuy'

const mapping = createMapping(abi, '0x131aebbfe55bca0c9eaad4ea24d386c5c082dd58')

mapping.startBlock = 10786971
mapping.filters = {
    handleBuy: (ctx, log) => {
        return ctx.transferRecorder.hasAssociatedCToken(log)
    },
}
mapping.handlers.handleBuy = (ctx, log, event) => {
    ctx.log.debug(
        `[ERC721Sale] Buy ${event.seller} -> ${event.buyer} tokenId:${event.tokenId} price:${event.price} nonce:${event.nonce}, token:${event.token}`,
    )
    const sellerId = event.seller.toLowerCase()
    const buyerId = event.buyer.toLowerCase()
    handleAltMarketBuy(ctx, log, 'ERC721Sale', sellerId, buyerId, event.price)
}

export default mapping
