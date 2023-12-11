/**
 * To make batches bigger, we can put the signature numbers in order.
 */

import {EntityClass, Store} from '@subsquid/typeorm-store'
import assert from 'assert'

export function patchStore() {
    // @ts-ignore
    Store.prototype.saveMany = async function (
        entityClass: EntityClass<any>,
        entities: any[],
    ): Promise<void> {
        assert(entities.length > 0)

        // @ts-ignore
        const em = this.em()
        const metadata = em.connection.getMetadata(entityClass)

        // @ts-ignore
        const fk = metadata.columns.filter((c) => c.relationMetadata)

        if (fk.length === 0) {
            // @ts-ignore
            return this.upsertMany(em, entityClass, entities)
        }

        // Create and sort signatures for entities
        // @ts-ignore
        const createSignature = (entity) => ({
            entity,
            // @ts-ignore
            value: this.getFkSignature(fk, entity),
        })
        const entityMap = entities
            .map(createSignature)
            .sort((a, b) => (a.value > b.value ? 1 : -1))

        let curSig = entityMap[0].value
        let batch = []

        for (const s of entityMap) {
            if (s.value === curSig) {
                batch.push(s.entity)
            } else {
                // @ts-ignore
                await this.upsertMany(em, entityClass, batch)
                batch = [s.entity]
                curSig = s.value
            }
        }

        if (batch.length) {
            // @ts-ignore
            await this.upsertMany(em, entityClass, batch)
        }
    }
}
