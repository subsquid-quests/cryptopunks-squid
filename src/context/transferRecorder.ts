import {getGlobalId, getGlobalIdWithOffset} from '../mapping/share/entitites'
import {Log} from '../processor'

type GlobalId = string

/**
 * To check the trade has been really happened, before decoding the event for efficiency.
 *
 * CTokens are created and cached in Transfer event
 *
 * Pattern 1. Transfer (logIndex: n) -> PunkBought (logIndex: n+1)
 * Pattern 2. Transfer (logIndex: n) -> PunkNoLongerForSale (logIndex: n+1) -> PunkBought (logIndex: n+2)
 *
 */
export class TransferRecorder {
    private transferRecords: Set<GlobalId> = new Set()
    private punkNoLongerForSaleRecords: Set<GlobalId> = new Set()

    recordTransfer(log: Log) {
        const id = getGlobalId(log)
        this.transferRecords.add(id)
    }

    recordPunkNoLongerForSale(log: Log) {
        const id = getGlobalId(log)
        this.punkNoLongerForSaleRecords.add(id)
    }

    getAssociatedCTokenId(log: Log): GlobalId | undefined {
        const offset1 = getGlobalIdWithOffset(log, 1)
        const offset2 = getGlobalIdWithOffset(log, 2)

        // Check if the immediate previous log was a Transfer.
        if (this.transferRecords.has(offset1)) {
            return offset1
        }

        // If the previous log was PunkNoLongerForSale, check if the one before that was a Transfer.
        if (
            this.punkNoLongerForSaleRecords.has(offset1) &&
            this.transferRecords.has(offset2)
        ) {
            return offset2
        }

        return undefined
    }

    hasAssociatedCToken(log: Log) {
        return this.getAssociatedCTokenId(log) !== undefined
    }
}
