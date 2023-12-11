import {Entity, Store} from '@subsquid/typeorm-store'
import {FindOptionsRelations, In} from 'typeorm'
import {ProcessorContext} from '../processor'
import {NullableObjectProps, chunkArray, mergeRelations} from '../utils'

export interface EntityClass<T extends Entity> {
    new (...args: any[]): T
}

/**
 * A utility class for managing nested maps with EntityClass as the primary key.
 * The nested map uses generic types A and B as key and value respectively.
 */
export class EntityClassMap<A, B> {
    private map: Map<EntityClass<Entity>, Map<A, B>> = new Map()

    /**
     * Ensures that a sub-map exists for the given entity class.
     * If not, initializes it.
     * @param entityClass - The EntityClass key to check or initialize.
     * @returns - The sub-map associated with the entity class.
     */
    private ensureSubMap<E extends Entity>(
        entityClass: EntityClass<E>,
    ): Map<A, B> {
        if (!this.map.has(entityClass)) {
            this.map.set(entityClass, new Map())
        }
        return this.map.get(entityClass) as Map<A, B>
    }

    /**
     * Provides an iterator over the main map entries.
     */
    *entries(): IterableIterator<[EntityClass<Entity>, Map<A, B>]> {
        for (let [entityClass, subMap] of this.map) {
            yield [entityClass, subMap]
        }
    }

    *keys(): IterableIterator<EntityClass<Entity>> {
        for (let [entityClass] of this.map) {
            yield entityClass
        }
    }

    /**
     * Returns the sub-map associated with the given entity class.
     * @param entityClass - The EntityClass key to retrieve.
     */
    subMap<E extends Entity>(entityClass: EntityClass<E>): Map<A, B> {
        return this.ensureSubMap(entityClass)
    }

    /**
     * Set a value in the sub-map of the given entity class.
     * @param entityClass - The EntityClass key.
     * @param key - The key in the sub-map.
     * @param value - The value to set.
     */
    set<E extends Entity>(entityClass: EntityClass<E>, key: A, value: B): void {
        this.ensureSubMap(entityClass).set(key, value)
    }

    /**
     * Get a value from the sub-map of the given entity class.
     * @param entityClass - The EntityClass key.
     * @param key - The key in the sub-map.
     * @returns - The retrieved value or undefined.
     */
    get<E extends Entity>(entityClass: EntityClass<E>, key: A): B | undefined {
        return this.ensureSubMap(entityClass).get(key)
    }

    /**
     * Check if a key exists in the sub-map of the given entity class.
     * @param entityClass - The EntityClass key.
     * @param key - The key to check.
     * @returns - True if the key exists, otherwise false.
     */
    has<E extends Entity>(entityClass: EntityClass<E>, key: A): boolean {
        return this.ensureSubMap(entityClass).has(key)
    }

    /**
     * Delete a key-value pair from the sub-map of the given entity class.
     * @param entityClass - The EntityClass key.
     * @param key - The key to delete.
     */
    delete<E extends Entity>(entityClass: EntityClass<E>, key: A): void {
        this.ensureSubMap(entityClass).delete(key)
    }

    clearAll() {
        this.map.clear()
    }
}
export type Deferred<E extends Entity> = {
    get: () => E | undefined
}

/**
 * EntitySyncManager is responsible for managing the synchronization of entities
 * between the application's memory (cache) and an external store.
 *
 * The manager provides functionalities to:
 * - Prepare entities for future retrieval from the store.
 * - Load reserved entities into the cache.
 * - Save (or cache) entities and mark them for future saving to the store.
 * - Flush the save entities to the store.
 */
export class EntitySyncManager {
    private relationsForLoading = new Map<
        EntityClass<Entity>,
        FindOptionsRelations<Entity>
    >()
    private entityIdsToLoad: EntityClassMap<string, {}> = new EntityClassMap()
    private entityIdsToSave: EntityClassMap<string, {}> = new EntityClassMap()
    private entitiesToSaveEarlier: EntityClassMap<string, Entity> =
        new EntityClassMap()
    private cachedEntities: EntityClassMap<string, Entity> =
        new EntityClassMap()

    /**
     * Reserve an entity for future retrieval.
     * @param entityClass - The class of the entity to reserve.
     * @param id - The ID of the entity to reserve.
     * @param relations - The relations to load with the entity.
     * @returns - An object with a method to get the reserved entity.
     */
    prepare<E extends Entity>(
        entityClass: EntityClass<E>,
        id: string,
        relations: FindOptionsRelations<E> = {},
    ): Deferred<E> {
        this.relationsForLoading.set(
            entityClass,
            mergeRelations(
                this.relationsForLoading.get(entityClass) || {},
                relations,
            ),
        )
        this.entityIdsToLoad.set(entityClass, id, {})
        return {
            get: () =>
                this.cachedEntities.get(entityClass, id) as E | undefined,
        }
    }

    /**
     * Load reserved entities from the provided store into the cache.
     *
     * @param ctx - The processor context.
     */
    async load(ctx: ProcessorContext<Store>) {
        ctx.log.debug('Loading entities from DB...')

        // Async function to load a specific entity class
        const loadEntityClass = async (entityClass: any, map: any) => {
            const idsToLoad = [...map.keys()].filter(
                (id) => !this.cachedEntities.subMap(entityClass).has(id),
            )
            if (idsToLoad.length === 0) return

            const idLength = idsToLoad[0].length
            const maxLengthForIn = 50_000
            const chunkSize = Math.max(
                3_000,
                Math.floor(maxLengthForIn / idLength),
            )

            for (const idChunk of chunkArray(idsToLoad, chunkSize)) {
                ctx.log.debug(
                    `Loading (async) ${entityClass.name} ${idChunk.length} entities...`,
                )
                const chunkedEntities = await ctx.store.find(entityClass, {
                    where: {
                        id: In(idChunk),
                    },
                    relations: this.relationsForLoading.get(entityClass),
                })
                chunkedEntities.forEach((entity) =>
                    this.cachedEntities.set(entityClass, entity.id, entity),
                )
                ctx.log.debug(
                    `Loaded (async) ${entityClass.name} ${chunkedEntities.length} entities.`,
                )
            }
        }

        // Wait for all promises to resolve
        await Promise.all(
            [...this.entityIdsToLoad.entries()].map(([entityClass, map]) =>
                loadEntityClass(entityClass, map),
            ),
        )

        this.entityIdsToLoad = new EntityClassMap()
        ctx.log.debug('Loaded.')
    }

    /**
     * Lookup an entity in the cache. This method is not intended for general use.
     * When calling this method, ensure you understand what you are doing.
     *
     * @param entityClass - The class of the entity to lookup.
     * @param id - The ID of the entity to lookup.
     * @returns - The cached entity or undefined.
     */
    lookupCache<E extends Entity>(entityClass: EntityClass<E>, id: string) {
        return this.cachedEntities.get(entityClass, id) as E | undefined
    }

    /**
     * Caches the given entity and ensures it is saved earlier than other entities.
     * This is especially useful for saving just the ID to avoid foreign key constraints errors.
     * Given a set of fields to exclude (or omit), it ensures those fields are not considered in the cloned entity.
     *
     * @param entity - The entity to cache and mark for saving.
     * @param fieldsToExclude - An object specifying which fields of the entity to exclude from the saved version. True means the field will be excluded.
     */
    saveForId<E extends Entity>(
        entity: E,
        fieldsToExclude: NullableObjectProps<E>[] = [],
        storeInCache = false, // false by default
    ) {
        const entityClass = entity.constructor as EntityClass<E>
        const cloned = new entityClass({...entity})
        if (storeInCache) {
            this.cachedEntities.set(entityClass, entity.id, entity)
        }

        for (const key of fieldsToExclude) {
            ;(cloned as any)[key] = null
        }
        this.entitiesToSaveEarlier.set(entityClass, cloned.id, cloned)
    }

    /**
     * Cache the provided entity and mark it for future saving.
     * @param entity - The entity to cache and mark for saving.
     */
    save<E extends Entity>(entity: E) {
        const entityClass = entity.constructor as EntityClass<E>
        this.cachedEntities.set(entityClass, entity.id, entity)
        this.entityIdsToSave.set(entityClass, entity.id, {})
    }

    /**
     * Upsert cached entities to the provided store.
     * @param ctx - The processor context.
     */
    async flush(
        ctx: ProcessorContext<Store>,
        priorityOrder: EntityClass<Entity>[] = [],
    ) {
        ctx.log.debug('Flushing entities to DB...')
        // save earlier entities
        const keysEarlier = [...this.entitiesToSaveEarlier.keys()]
        // save earlier entities which has priority
        for (const entityClass of priorityOrder.filter((key) =>
            keysEarlier.includes(key),
        )) {
            const entities = [
                ...this.entitiesToSaveEarlier.subMap(entityClass).values(),
            ]
            ctx.log.debug(
                `Flushing (earlier-sync) ${entityClass.name}: ${entities.length}`,
            )
            await ctx.store.upsert(entities)
        }
        // save later entities
        await Promise.all(
            keysEarlier
                .filter((key) => !priorityOrder.includes(key))
                .map((entityClass) => {
                    const entities = [
                        ...this.entitiesToSaveEarlier
                            .subMap(entityClass)
                            .values(),
                    ]
                    ctx.log.debug(
                        `Flushing (earlier-async) ${entityClass.name}: ${entities.length}`,
                    )
                    return ctx.store.upsert(entities)
                }),
        )
        this.entitiesToSaveEarlier.clearAll()

        // save later entities
        await Promise.all(
            [...this.entityIdsToSave.entries()].map(([entityClass, map]) => {
                const entities = [...map.keys()]
                    .map((id) => this.cachedEntities.get(entityClass, id))
                    .filter((entity) => entity !== undefined) as Entity[]
                if (entities.length === 0) return
                ctx.log.debug(
                    `Flushing (later-async) ${entityClass.name}: ${entities.length}`,
                )
                return ctx.store.upsert(entities)
            }),
        )
        this.entityIdsToSave.clearAll()
        ctx.log.debug('Flushed.')
    }
}
