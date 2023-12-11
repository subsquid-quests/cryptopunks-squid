import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"

@Entity_()
export class UserProxy {
    constructor(props?: Partial<UserProxy>) {
        Object.assign(this, props)
    }

    /**
     * Contract Address of UserProxy
     */
    @PrimaryColumn_()
    id!: string

    /**
     * Account that owns the Proxy
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    user!: Account

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
