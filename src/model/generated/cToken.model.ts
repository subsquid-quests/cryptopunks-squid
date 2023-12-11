import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"

@Entity_()
export class CToken {
    constructor(props?: Partial<CToken>) {
        Object.assign(this, props)
    }

    /**
     * TxHash + logNumber
     */
    @PrimaryColumn_()
    id!: string

    /**
     * Sender
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    from!: Account

    /**
     * Recepient
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    to!: Account

    /**
     * New owner of Punk
     */
    @Column_("text", {nullable: false})
    owner!: string

    /**
     * Amount of cToken transferred
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amount!: bigint | undefined | null

    @Column_("text", {nullable: true})
    punkId!: string | undefined | null

    /**
     * Field for storing referenceIDs of other events in the same transaction
     */
    @Column_("text", {nullable: false})
    referenceId!: string

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
