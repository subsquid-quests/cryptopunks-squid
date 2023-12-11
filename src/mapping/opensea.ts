import * as abi from '../abi/Opensea'
import {createMapping} from './share/mapper'
import {handleAltMarketBuy} from './share/handleAltMarketBuy'

const mapping = createMapping(abi, '0x7be8076f4ea4a4ad08075c2508e481d6c946d12b')

mapping.startBlock = 5774644
mapping.filters = {
    handleOrdersMatched: (ctx, log) => {
        return ctx.transferRecorder.hasAssociatedCToken(log)
    },
}

/**
 *@summary OpenSea Contract - Track WRAPPEDPUNK sale
 *@description:
 *	 ROOT ISSUE:  Punk 7443 was sold on Opensea while wrapped.
 *		- Account: https://cryptopunks.app/cryptopunks/accountinfo?account=0x0eb9a7ff5cbf719251989caf1599c1270eafb531
 *  	- Example: https://etherscan.io/tx/0xac6acdca9aeb00238ff885dcd4e697afd1cfa8ba75ef69622f786b96f8d164cf#eventlog
 *  - We want to capture this so we can calculate average prices & update other aggregates both for punk & account
 *
 *	- We filter out wrappedPunk transactions by ensuring
 *		- both events occur in the same transaction
 *		- the wrappedPunk contract address emitted it
 */

mapping.handlers.handleOrdersMatched = (ctx, log, event) => {
    // buyHash: string, sellHash: string, maker: string, taker: string, price: bigint, metadata: string
    const sellerId = event.maker.toLowerCase()
    const buyerId = event.taker.toLowerCase()
    handleAltMarketBuy(ctx, log, 'OpenSea', sellerId, buyerId, event.price)
}

export default mapping
