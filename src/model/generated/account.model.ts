import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Punk} from "./punk.model"
import {Sale} from "./sale.model"
import {Assign} from "./assign.model"
import {Transfer} from "./transfer.model"
import {Bid} from "./bid.model"
import {Ask} from "./ask.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    /**
     * Ethereum Address
     */
    @PrimaryColumn_()
    id!: string

    /**
     * All Punks owned by Account
     */
    @OneToMany_(() => Punk, e => e.owner)
    punksOwned!: Punk[]

    /**
     * Purchases by Account
     */
    @OneToMany_(() => Sale, e => e.to)
    bought!: Sale[]

    /**
     * All Punks owned by Account
     */
    @OneToMany_(() => Punk, e => e.owner)
    nftsOwned!: Punk[]

    /**
     * Punks assigned to account (if any)
     */
    @OneToMany_(() => Assign, e => e.to)
    assigned!: Assign[]

    /**
     * Punk transfers by Account
     */
    @OneToMany_(() => Transfer, e => e.from)
    sent!: Transfer[]

    /**
     * Punk transfers to Account
     */
    @OneToMany_(() => Transfer, e => e.to)
    received!: Transfer[]

    /**
     * Query bids by Account
     */
    @OneToMany_(() => Bid, e => e.from)
    bids!: Bid[]

    /**
     * Punks offered for sale by Account
     */
    @OneToMany_(() => Ask, e => e.from)
    asks!: Ask[]

    /**
     * Total number of Punks owned by account
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    numberOfPunksOwned!: bigint

    /**
     * Total number of Punks assigned to account
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    numberOfPunksAssigned!: bigint

    /**
     * Total number of transfer by Account
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    numberOfTransfers!: bigint

    /**
     * Total number of sales by Account
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    numberOfSales!: bigint

    /**
     * Total number of purchases by Account
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    numberOfPurchases!: bigint

    /**
     * Total amount spent buying Punks by Account
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalSpent!: bigint

    /**
     * Total amount earned by Account from selling Punks
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalEarned!: bigint

    /**
     * Average amount spent buying Punks by Account
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    averageAmountSpent!: bigint

    /**
     * Account URL
     */
    @Column_("text", {nullable: false})
    accountUrl!: string
}
