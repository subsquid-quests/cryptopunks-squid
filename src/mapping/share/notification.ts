import {
    Account,
    EpnsNotificationCounter,
    EpnsPushNotification,
    Punk,
} from '../../model'
import {CtxWithCache, Log} from '../../processor'
import {instantiate} from '../../utils'
import {SUBGRAPH_ADDRESS, SUBGRAPH_ID} from './constants'

function instantiateEpnsNotificationCounter(id: string) {
    return instantiate(EpnsNotificationCounter, {
        id,
        totalCount: 0n,
    })
}

function sendEpnsNotification(
    ctx: CtxWithCache,
    recipient: string,
    notification: string,
): void {
    const counterDefer = ctx.esm.prepare(EpnsNotificationCounter, SUBGRAPH_ID)
    ctx.queue.enqueue(() => {
        let epnsNotificationCounter = counterDefer.get()
        if (!epnsNotificationCounter) {
            epnsNotificationCounter = instantiate(EpnsNotificationCounter, {
                id: SUBGRAPH_ID,
                totalCount: 0n,
            })
        }
        epnsNotificationCounter.totalCount++
        const id = `${SUBGRAPH_ID}+${epnsNotificationCounter.totalCount}`
        const epnsPushNotification = instantiate(EpnsPushNotification, {
            id,
            recipient,
            notification,
            notificationNumber: epnsNotificationCounter.totalCount,
        })
        ctx.esm.save(epnsPushNotification)
        ctx.esm.save(epnsNotificationCounter)
    })
}

export function handleAskNotification(
    ctx: CtxWithCache,
    punk: Punk,
    owner: Account,
    price: bigint,
    log: Log,
) {
    const priceDecimal = convertPriceToBigDecimal(price)
    const askTxHash = log.transaction?.hash
    const recipient = SUBGRAPH_ADDRESS,
        type = '1',
        title = 'New Listing',
        body = `${owner.id} listed Punk:${punk.id} for ${priceDecimal} ETH`,
        subject = 'Punk Offer Event',
        message = `New Listing! ${owner.id} wants ${priceDecimal} ETH for Punk: ${punk.id}`,
        image = `https://cryptopunks.app/public/images/cryptopunks/punk${punk.id}.png`,
        secret = 'null',
        cta = `https://etherscan.io/tx/${askTxHash}`

    let notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"${message}\", \"image\": \"${image}\", \"secret\": \"${secret}\", \"cta\": \"${cta}\"}`
    sendEpnsNotification(ctx, recipient, notification)
}

export function handleBidNotification(
    ctx: CtxWithCache,
    punk: Punk,
    bidder: Account,
    price: bigint,
    log: Log,
) {
    const priceDecimal = convertPriceToBigDecimal(price)
    const bidTxHash = log.transaction?.hash
    const recipient = SUBGRAPH_ADDRESS,
        type = '1',
        title = 'New Punk Bid',
        body = `New Bid for Punk: ${punk.id} for ${priceDecimal} ETH by ${bidder.id}`,
        subject = 'Punk Bid Event',
        message = `${bidder.id} placed a ${priceDecimal} ETH bid for Punk: ${punk.id}`,
        image = `https://cryptopunks.app/public/images/cryptopunks/punk${punk.id}.png`,
        secret = 'null',
        cta = `https://etherscan.io/tx/${bidTxHash}`

    const notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"${message}\", \"image\": \"${image}\", \"secret\": \"${secret}\", \"cta\": \"${cta}\"}`
    sendEpnsNotification(ctx, recipient, notification)
}

export function convertPriceToBigDecimal(
    quantity: bigint,
    decimals: number = 18,
): number {
    return Number(quantity) / Math.pow(10, decimals)
}

export function handleSaleNotification(
    ctx: CtxWithCache,
    punk: Punk,
    account: Account,
    price: bigint,
    log: Log,
) {
    const priceDecimal = convertPriceToBigDecimal(price)
    const saleTxHash = log.transaction?.hash
    const recipient = SUBGRAPH_ADDRESS,
        type = '1',
        title = 'Punk Sold',
        body = `Yeehaw! Punk: ${punk.id} bought by ${account.id} for ${priceDecimal} ETH`,
        subject = 'Punk Sale Event',
        message = `Yeehaw! Punk: ${punk.id} sold to ${account.id} for ${priceDecimal} ETH`,
        image = `https://cryptopunks.app/public/images/cryptopunks/punk${punk.id}.png`,
        secret = 'null',
        cta = `https://etherscan.io/tx/${saleTxHash}`

    let notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"${message}\", \"image\": \"${image}\", \"secret\": \"${secret}\", \"cta\": \"${cta}\"}`
    sendEpnsNotification(ctx, recipient, notification)
}
