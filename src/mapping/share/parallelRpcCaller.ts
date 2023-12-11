import {RpcClient} from '@subsquid/rpc-client'
import {Logger} from '@subsquid/logger'
import {Multicall} from '../../abi/multicall'
import {Block, Func} from '../../abi/abi.support'
import {chunkArray} from '../../utils'

const PUBLIC_ENDPOINTS: string[] = [
    ...new Set([
        'https://cloudflare-eth.com',
        'https://rpc.flashbots.net/',
        'https://rpc.ankr.com/eth',
        'https://eth-mainnet.public.blastapi.io',
        'https://1rpc.io/eth',
        'https://eth.drpc.org',
        'https://rpc.mevblocker.io',
        'https://ethereum-mainnet-rpc.allthatnode.com',
        'https://ethereum-mainnet-rpc-germany.allthatnode.com',
        'https://ethereum-mainnet-rpc-korea.allthatnode.com',
        // 'https://eth.meowrpc.com',
        // 'https://eth-rpc.gateway.pokt.network',
        // 'https://api.mycryptoapi.com/eth',
        // 'https://mainnet.eth.cloud.ava.do/',
        // 'https://ethereumnodelight.app.runonflux.io',
        // 'https://eth-mainnet.nodereal.io/v1/',
        // 'https://api.securerpc.com/v1',
        // 'https://eth-mainnet.rpcfast.com',
        // 'https://ethereum.publicnode.com',
        // 'https://rpc.payload.de',
        // 'https://llamanodes.com/',
        // 'https://eth.api.onfinality.io/public',
    ]),
]

/**
 * `CooldownManager` class manages cooldown periods.
 * It allows setting a cooldown duration and then checking if the cooldown has expired.
 */
class CooldownManager {
    // Timestamp of when the next operation is allowed.
    private nextAllowedTime = 0

    /**
     * Start a cooldown period.
     * @param {number} duration - Duration of the cooldown in milliseconds.
     */
    startCooldown(duration: number) {
        this.nextAllowedTime = Date.now() + duration
    }

    /**
     * Determines if we're currently within the cooldown period.
     * @returns {boolean} - true if in cooldown, false otherwise.
     */
    isOnCooldown(): boolean {
        return Date.now() < this.nextAllowedTime
    }
}

class Client {
    private rpcClient: RpcClient
    private cooldownManager = new CooldownManager()

    constructor(private multicallAddress: string, private rpcEndpoint: string) {
        this.rpcClient = new RpcClient({
            url: rpcEndpoint,
            rateLimit: 1000,
            requestTimeout: 10000,
        })
    }

    getEndpoint() {
        return this.rpcEndpoint
    }

    suspend(ms: number) {
        this.cooldownManager.startCooldown(ms)
    }

    isSuspended() {
        return this.cooldownManager.isOnCooldown()
    }

    async call<Args extends any[], Result>(
        block: Block,
        address: string,
        func: Func<Args, any, Result>,
        args: any[][],
        pageSize: number,
    ) {
        if (this.cooldownManager.isOnCooldown()) {
            throw new Error('Client is suspended')
        }
        const multicall = new Multicall(
            {_chain: {client: this.rpcClient}},
            block,
            this.multicallAddress,
        )
        const result = await multicall.aggregate(func, address, args, pageSize)
        return result
    }
}

/**
 * `ParallelRpcCaller` class allows for making parallel RPC calls.
 * It utilizes multiple `CustomRpcCaller` instances to spread the calls across them.
 * If a client experiences an error, it is put on a cooldown.
 */
export class ParallelRpcCaller {
    private clients: Client[]

    constructor(
        multicallAddress: string,
        rpcEndpoints: string[] = PUBLIC_ENDPOINTS,
    ) {
        this.clients = rpcEndpoints.map(
            (endpoint) => new Client(multicallAddress, endpoint),
        )
    }

    private readonly maxFailures = 10
    private readonly suspensionTimeMs = 10000
    private readonly suspensionCheckIntervalMs = 100

    /**
     * Make parallel RPC calls.
     *
     * @param block - Block to be used for the RPC calls.
     * @param address - Contract address for the RPC calls.
     * @param func - Function descriptor for the RPC calls.
     * @param argsBatch - Array of arguments for the RPC calls.
     * @param pageSize - Number of items per calls.
     *
     * @returns An array of results or errors.
     */
    async batchCall<Args extends any[], Result>(
        logger: Logger,
        block: Block,
        address: string,
        func: Func<Args, any, Result>,
        argsBatch: any[][],
        pageSize: number,
    ): Promise<Result[]> {
        const queue = [...chunkArray(argsBatch, pageSize)].map(
            (args, index) => ({
                args,
                index,
            }),
        )
        const allResults: (Result[] | undefined)[] = new Array(
            queue.length,
        ).fill(undefined)

        logger.debug(
            `Making ${queue.length} calls with RPC endpoints: [${this.clients
                .map((c) => `"${c.getEndpoint()}"`)
                .join(', ')}]`,
        )
        const failCounts = new WeakMap<any[][], number>()
        const handleTaskResult = (
            endpoint: string,
            index: number,
            args: any[][],
            results?: Result[],
            error?: Error,
        ) => {
            if (results) {
                allResults[index] = results
                return
            }
            const count = (failCounts.get(args) || 0) + 1
            if (count < this.maxFailures) {
                // Enqueue it again to be retried
                failCounts.set(args, count)
                queue.push({args, index})
                logger.warn(
                    `Re enqueued task [endpoint: ${endpoint}, args: ${args}] due to error: ${error?.message}`,
                )
            } else {
                throw error
            }
        }
        // Process tasks using a specific client
        const processWithClient = async (client: Client) => {
            let suspensionTimeMs = this.suspensionTimeMs
            let interval = 500
            while (queue.length > 0) {
                await new Promise((res) => setTimeout(res, interval))
                if (client.isSuspended()) {
                    // Wait for a brief period before checking again
                    await new Promise((res) =>
                        setTimeout(res, this.suspensionCheckIntervalMs),
                    )
                    continue
                }
                // let it do the next task
                const task = queue.shift()
                if (!task) {
                    break
                }
                try {
                    logger.debug(
                        `Calling with ${
                            task.args.length
                        } args, rpc endpoint: ${client.getEndpoint()}`,
                    )
                    const results = await client.call(
                        block,
                        address,
                        func,
                        task.args,
                        pageSize,
                    )
                    handleTaskResult(
                        client.getEndpoint(),
                        task.index,
                        task.args,
                        results,
                    )
                } catch (error) {
                    client.suspend(Math.floor(suspensionTimeMs)) // Suspend client if an error occurs
                    suspensionTimeMs *= 2
                    interval *= 2
                    handleTaskResult(
                        client.getEndpoint(),
                        task.index,
                        task.args,
                        undefined,
                        error as Error,
                    )
                }
            }
        }
        const monitorProgress = async () => {
            const totalItems = allResults.length
            const monitoringStartTime = Date.now()
            while (queue.length > 0) {
                await new Promise((res) => setTimeout(res, 5000))
                const currentTime = Date.now()
                const elapsedSeconds =
                    (currentTime - monitoringStartTime) / 1000
                const processedItems = allResults.filter(
                    (r) => r !== undefined,
                ).length
                const percentageCompleted = (
                    (processedItems / totalItems) *
                    100
                ).toFixed(1)
                const itemsPerSecond = processedItems / elapsedSeconds
                const remainingItems = totalItems - processedItems
                const etaSeconds = remainingItems / itemsPerSecond
                const etaMins = Math.floor(etaSeconds / 60)
                    .toString()
                    .padStart(2, '0')
                const etaSecs = Math.floor(etaSeconds % 60)
                    .toString()
                    .padStart(2, '0')
                logger.info(
                    `Progress: ETA: ${etaMins}:${etaSecs} (${percentageCompleted}%) ${processedItems}/${totalItems}`,
                )
            }
        }
        // Start processing with all available clients
        await Promise.all([
            ...this.clients.map(processWithClient),
            monitorProgress(),
        ])
        if (allResults.some((result) => result === undefined)) {
            throw new Error(`Some results are undefined unexpectedly. `)
        }

        return allResults.flat() as Result[]
    }
}
