import {WRAPPED_PUNK_ADDRESS} from './constants'
import {Account, Contract, Punk, Sale} from '../../model'
import {CtxWithCache, Log} from '../../processor'
import {
    closeOldBid,
    getSaleId,
    instantiateAccount,
    instantiateSale,
    lookupCachedCToken,
    updateAccountAggregates,
    updateContractAggregates,
    updatePunkSaleAggregates,
    updateSale,
} from './entitites'
import {fetchWrappedPunkContract} from './contracts'
import {calcRaribleComissionFee} from '../raribleExchangeV1'

export function handleAltMarketBuy(
    ctx: CtxWithCache,
    log: Log,
    market: 'RaribleExchangeV1' | 'ERC721Sale' | 'OpenSea',
    sellerId: string,
    buyerId: string,
    price: bigint,
) {
    const fromAccountDeferred = ctx.esm.prepare(Account, sellerId)
    const toAccountDeferred = ctx.esm.prepare(Account, buyerId)
    const contractDeferred = ctx.esm.prepare(Contract, WRAPPED_PUNK_ADDRESS)
    const saleId = getSaleId(log)
    const saleDeferred = ctx.esm.prepare(Sale, saleId)
    ctx.queue.enqueue(async () => {
        ctx.log.debug(
            `[Sale: ${market}] Buy ${sellerId} -> ${buyerId} price:${price}`,
        )
        const cToken = lookupCachedCToken(ctx, log)
        if (!cToken) {
            ctx.log.debug(`[${market}] CToken not found for sale ${saleId}`)
            return
        }
        const punkId = cToken.punkId
        if (!punkId) {
            ctx.log.warn(
                `[${market}] punkId is not assigned for sale ${saleId})}`,
            )
            return
        }
        const punk = ctx.esm.lookupCache(Punk, punkId)
        if (!punk) {
            ctx.log.error(
                `[${market}] Punk ${punkId} not found for sale ${saleId}`,
            )
            return
        }
        const contractAddr = cToken.referenceId
        if (contractAddr !== WRAPPED_PUNK_ADDRESS) {
            ctx.log.warn(
                `[${market}] Contract ${contractAddr} is not wrapped punk`,
            )
            return
        }
        let contract = contractDeferred.get()
        if (!contract) {
            contract = await fetchWrappedPunkContract(
                ctx,
                log.block,
                WRAPPED_PUNK_ADDRESS,
            )
        }

        let _fromAccount = fromAccountDeferred.get()
        if (!_fromAccount) {
            _fromAccount = instantiateAccount(sellerId)
            ctx.esm.saveForId(_fromAccount)
        }
        let _toAccount = toAccountDeferred.get()
        if (!_toAccount) {
            _toAccount = instantiateAccount(buyerId)
            ctx.esm.saveForId(_toAccount)
        }

        let sale = saleDeferred.get()
        if (!sale) {
            sale = instantiateSale(punk, _fromAccount, log)
        }
        sale.contract = null // for alt markets

        /*
         * - We want to capture this sale.
         * - The major difference between this sale and a regular sale is that
         * - the maker becomes the buyer --> (toAccount)
         * - the taker becomes the seller --> (fromAccount)
         * - Example:
         *   https://etherscan.io/tx/0x0e44a5eb1d553ab2daacf43fd50bcd73f030e739de009368a9f2897150e1215d#eventlog
         *
         * - Getting the maker address from the toAccount in the wrappedPunk Transfer event confirms that
         *               this is a bid accepted sale because the maker is the buyer, but in the OrderMatched event, the maker is the seller.
         */
        const trueBuyer = cToken.to.id
        const fromAccount = trueBuyer === buyerId ? _fromAccount : _toAccount
        const toAccount = trueBuyer === buyerId ? _toAccount : _fromAccount
        if (trueBuyer !== buyerId) {
            if (market === 'RaribleExchangeV1') {
                price -= calcRaribleComissionFee(price)
            }
        }
        updateSale(sale, price, toAccount)
        if (market === 'ERC721Sale') {
            closeOldBid(ctx, punk, toAccount)
        }
        updateAccountAggregates(fromAccount, toAccount, price)
        updatePunkSaleAggregates(punk, price)
        updateContractAggregates(contract, price)
        ctx.esm.save(contract)
        ctx.esm.save(fromAccount)
        ctx.esm.save(toAccount)
        ctx.esm.save(punk)
        ctx.esm.save(sale)
    })
}
