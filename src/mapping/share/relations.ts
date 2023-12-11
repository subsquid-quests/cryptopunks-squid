import {FindOptionsRelations} from 'typeorm'
import {Punk} from '../../model'

export const defaultPunkRelations: FindOptionsRelations<Punk> = {
    owner: true,
    contract: true,
    transferedTo: true,
    assignedTo: true,
    purchasedBy: true,
    currentAsk: true,
    currentBid: {
        from: true,
    },
    currentAskCreated: true,
    currentAskRemoved: true,
    currentBidCreated: true,
    currentBidRemoved: true,
}
