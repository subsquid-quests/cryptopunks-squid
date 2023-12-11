import * as cryptoPunksDataAbi from '../../abi/CryptoPunksData'
import {Contract as ContractModel, MetaData} from '../../model'
import {CtxWithCache, ProcessorContext} from '../../processor'
import {CRYPTOPUNKS_DATA_ADDRESS, MULTICALL_ADDRESS} from './constants'
import * as abiCryptoPunks from '../../abi/cryptopunks'
import * as abiWrappedPunks from '../../abi/wrappedpunks'
import {chunkArray, instantiate} from '../../utils'
import {ParallelRpcCaller} from './parallelRpcCaller'
import {IsNull, Not} from 'typeorm'
import {Store} from '@subsquid/typeorm-store'
import {Block} from '../../abi/abi.support'

export const deleteAllImages = async (ctx: ProcessorContext<Store>) => {
    const es = await ctx.store.find(MetaData, {
        where: [{image: Not(IsNull())}, {svg: Not(IsNull())}],
    })
    ctx.log.info(`Deleting ${es.length} images.`)
    es.forEach((e) => {
        e.image = null
        e.svg = null
    })
    await ctx.store.upsert(es)
}

export const fetchAndSavePunkImages = async (
    ctx: ProcessorContext<Store>,
    block: Block,
): Promise<boolean> => {
    ctx.log.info(
        `[CryptoPunksData] Fetching and saving punk images with multiple MultiCall.`,
    )
    const caller = new ParallelRpcCaller(MULTICALL_ADDRESS)
    const chunkSize = 2000
    const [entitiesToFetchImages, entitiesToFetchSvgs] = await Promise.all([
        ctx.store.find(MetaData, {
            where: {image: IsNull()},
            take: chunkSize,
            order: {tokenId: 'ASC'},
        }),
        ctx.store.find(MetaData, {
            where: {svg: IsNull()},
            take: chunkSize,
            order: {tokenId: 'ASC'},
        }),
    ])
    {
        // fetch images
        const idsToFetchImages = entitiesToFetchImages.map((e) => e.tokenId)
        if (idsToFetchImages.length > 0) {
            ctx.log.info(
                `[CryptoPunksData] Fetching ${
                    idsToFetchImages.length
                } images from ${idsToFetchImages[0]} to ${
                    idsToFetchImages[idsToFetchImages.length - 1]
                }`,
            )
            const images = await caller.batchCall(
                ctx.log,
                block,
                CRYPTOPUNKS_DATA_ADDRESS,
                cryptoPunksDataAbi.functions.punkImage,
                idsToFetchImages.map((i) => [i]),
                2,
            )
            // save results
            entitiesToFetchImages.forEach((e, i) => {
                e.image = images[i]
            })
            for (const chunk of chunkArray(entitiesToFetchImages, 100)) {
                await ctx.store.upsert(chunk)
            }
            ctx.log.info(`Saved ${images.length} images.`)
            return false
        }
    }
    {
        // fetch svgs
        const idsToFetchSvgs = entitiesToFetchSvgs.map((e) => e.tokenId)
        if (idsToFetchSvgs.length > 0) {
            ctx.log.info(
                `[CryptoPunksData] Fetching ${
                    idsToFetchSvgs.length
                } svgs from ${idsToFetchSvgs[0]} to ${
                    idsToFetchSvgs[idsToFetchSvgs.length - 1]
                }`,
            )
            const svgs = await caller.batchCall(
                ctx.log,
                block,
                CRYPTOPUNKS_DATA_ADDRESS,
                cryptoPunksDataAbi.functions.punkImageSvg,
                idsToFetchSvgs.map((i) => [i]),
                1,
            )
            // save results
            entitiesToFetchSvgs.forEach((e, i) => {
                e.svg = svgs[i]
            })
            for (const chunk of chunkArray(entitiesToFetchSvgs, 100)) {
                await ctx.store.upsert(chunk)
            }
            ctx.log.info(`Saved ${svgs.length} svgs.`)
            return false
        }
    }
    return true
}

export async function fetchCryptoPunkContract(
    ctx: CtxWithCache,
    block: Block,
    address: string,
) {
    ctx.log.warn(`Contract state calls: fetchCryptoPunkContract: ${address}`)
    const client = new abiCryptoPunks.Contract(ctx, block, address)
    const symbol = await client.symbol()
    const name = await client.name()
    const imageHash = await client.imageHash()
    const totalSupply = await client.totalSupply()
    const contract = instantiate(ContractModel, {
        id: address.toLowerCase(),
        totalAmountTraded: 0n,
        totalSales: 0n,
        symbol,
        name,
        imageHash,
        totalSupply,
    })
    return contract
}

export async function fetchWrappedPunkContract(
    ctx: CtxWithCache,
    block: Block,
    address: string,
) {
    ctx.log.warn(`Contract state calls: fetchWrappedPunkContract: ${address}`)
    const client = new abiWrappedPunks.Contract(ctx, block, address)
    const symbol = await client.symbol()
    const name = await client.name()
    const totalSupply = await client.totalSupply()
    const contract = instantiate(ContractModel, {
        id: address.toLowerCase(),
        totalAmountTraded: 0n,
        totalSales: 0n,
        symbol,
        name,
        totalSupply,
    })
    return contract
}
