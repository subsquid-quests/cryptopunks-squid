import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {Contract} from "./contract.model"
import {Punk} from "./punk.model"
import {EventType} from "./_eventType"

@Entity_()
export class Sale {
    constructor(props?: Partial<Sale>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    /**
     * Punk buyer
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    to!: Account | undefined | null

    /**
     * Amount in ETH
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null

    /**
     * Punk seller
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    from!: Account | undefined | null

    /**
     * Contract metadata
     */
    @Index_()
    @ManyToOne_(() => Contract, {nullable: true})
    contract!: Contract | undefined | null

    /**
     * Punk being sold
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
