import {CtxWithCache, Log} from '../../processor'
import {LogRequest} from '@subsquid/evm-processor/lib/interfaces/data-request'
import assert from 'assert'
import {LogEvent} from '../../abi/abi.support'

type ABIEvent = LogEvent<any>

interface ABI {
    events: Record<string, ABIEvent>
}

type EventHandler<T> = (
    ctx: CtxWithCache,
    log: Log,
    event: T,
) => Promise<void> | void

const HANDLER_PREFIX = 'handle'

type EventHandlers<T extends ABI> = {
    [K in keyof T['events'] as K extends string
        ? `${typeof HANDLER_PREFIX}${K}`
        : never]?: EventHandler<ReturnType<T['events'][K]['decode']>>
}

type HandlerFilter = (ctx: CtxWithCache, log: Log) => boolean

type EventHandlerFilters<T extends ABI> = {
    [K in keyof EventHandlers<T>]?: HandlerFilter
}

export interface Mapping<T extends ABI> {
    address: string
    abi: T
    handlers: EventHandlers<T>
    startBlock?: number // not implemented
    // filter to decide whether to process the log, default is true
    // this is needed because the decoding process takes much time
    // Num of trades in OpenSea is huge!!
    filters?: EventHandlerFilters<T>
}

interface TopicHandlers {
    [key: string]: EventHandler<any>
}

interface TopicMappings {
    address: string
    abi: ABI
    topicHandlers: TopicHandlers
}

function getHandler<T extends ABI>(
    handlers: EventHandlers<T>,
    key: Extract<keyof EventHandlers<T>, string>,
): EventHandler<any> | undefined {
    return handlers[key]
}

// utility function to create a mapping
export function createMapping<T extends ABI>(
    abi: T,
    address: string,
): Mapping<T> {
    return {
        address: address,
        abi,
        handlers: {},
    }
}

export class Mapper {
    // to generate log requests
    private allMappings: TopicMappings[] = []
    // to find mapping by address
    private abiMappingsWithAddr: {[address: string]: TopicMappings} = {}
    // to find mapping by topic for no-address mappings
    private otherABIHandlers: {[topic: string]: EventHandler<any>} = {}
    // to find decoder by handler
    private logDecoders = new WeakMap<EventHandler<any>, ABIEvent>()
    // to find filter
    private handlerFilters = new WeakMap<EventHandler<any>, HandlerFilter>()

    /**
     * Add a mapping to the mapper.
     *
     * @param mapping - address mapping
     * @returns - this
     */
    add<T extends ABI>(mapping: Mapping<T>) {
        const topicHandlers: TopicHandlers = {}
        for (const handlerName in mapping.handlers) {
            const eventAbi =
                mapping.abi.events[handlerName.replace(HANDLER_PREFIX, '')]
            if (!eventAbi) continue
            const handler = getHandler(mapping.handlers, handlerName)
            if (handler) {
                this.logDecoders.set(handler, eventAbi)
                if (mapping.filters) {
                    const filter = mapping.filters[handlerName]
                    if (filter) {
                        this.handlerFilters.set(handler, filter)
                    }
                }
                topicHandlers[eventAbi.topic] = handler
            }
        }
        const m: TopicMappings = {
            address: mapping.address,
            abi: mapping.abi,
            topicHandlers: topicHandlers,
        }
        this.allMappings.push(m)
        if (m.address) {
            this.abiMappingsWithAddr[m.address.toLowerCase()] = m
        } else {
            this.otherABIHandlers = {
                ...this.otherABIHandlers,
                ...m.topicHandlers,
            }
        }
        return this
    }

    async processLog(ctx: CtxWithCache, log: Log) {
        const address = log.address.toLowerCase()
        const mapping = this.abiMappingsWithAddr[address]
        const handler =
            mapping?.topicHandlers[log.topics[0]] ||
            this.otherABIHandlers[log.topics[0]]
        if (!handler) return
        const filter = this.handlerFilters.get(handler)
        if (filter && !filter(ctx, log)) return
        const eventAbi = this.logDecoders.get(handler)
        if (!eventAbi) assert.fail('decoder not found')
        const d = eventAbi.decode(log)
        await handler(ctx, log, d)
    }

    getLogRequests(): LogRequest[] {
        return this.allMappings.map((mapping) => {
            const topic0 = Object.keys(mapping.topicHandlers)
            const address = mapping.address ? [mapping.address] : undefined
            return {
                address,
                topic0,
                transaction: true,
            }
        })
    }
}
