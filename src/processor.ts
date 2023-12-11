import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {Store} from '@subsquid/typeorm-store'
import * as mapping from './mapping'
import {patchStore} from './patch'
import {EntitySyncManager, SimpleQueue, TransferRecorder} from './context'
export const BLOCK_HEIGHT_TO_FETCH_PUNK_IMAGES = 18_340_000

// monkey patch
patchStore()

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('eth-mainnet'),
        chain: 'https://rpc.ankr.com/eth',
    })
    .setFinalityConfirmation(75)
    .setFields({
        transaction: {
            from: true,
            value: true,
            hash: true,
        },
    })
    .setBlockRange({
        from: 3914494,
    })

export const mapper = new mapping.Mapper()
    .add(mapping.cryptopunks)
    .add(mapping.wrappedPunks)
    .add(mapping.raribleExchangeV1)
    .add(mapping.erc721sale)
    .add(mapping.opensea)

mapper.getLogRequests().forEach((req) => {
    processor.addLog(req)
})

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
export type CtxWithCache = ProcessorContext<Store> & {
    queue: SimpleQueue
    esm: EntitySyncManager
    transferRecorder: TransferRecorder
}
