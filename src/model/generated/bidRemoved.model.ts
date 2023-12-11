import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {Bid} from "./bid.model"
import {Contract} from "./contract.model"
import {Punk} from "./punk.model"
import {EventType} from "./_eventType"

@Entity_()
export class BidRemoved {
    constructor(props?: Partial<BidRemoved>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    /**
     * Account that removed Bid
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    from!: Account | undefined | null

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    to!: Account | undefined | null

    /**
     * Bid that was removed, in ETH
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null

    @Index_()
    @ManyToOne_(() => Bid, {nullable: true})
    bid!: Bid

    /**
     * Contract metadata
     */
    @Index_()
    @ManyToOne_(() => Contract, {nullable: true})
    contract!: Contract | undefined | null

    /**
     * Punk whose Bid was removed
     */
    @Index_()
    @ManyToOne_(() => Punk, {nullable: true})
    nft!: Punk | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    logNumber!: bigint

    @Column_("varchar", {length: 11, nullable: false})
    type!: EventType

    /**
     * Transaction details
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    blockNumber!: bigint

    @Column_("bytea", {nullable: false})
    blockHash!: Uint8Array

    @Column_("bytea", {nullable: false})
    txHash!: Uint8Array

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint
}
