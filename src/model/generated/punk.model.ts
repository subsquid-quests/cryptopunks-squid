import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {MetaData} from "./metaData.model"
import {Contract} from "./contract.model"
import {Ask} from "./ask.model"
import {Bid} from "./bid.model"
import {AskCreated} from "./askCreated.model"
import {BidCreated} from "./bidCreated.model"
import {AskRemoved} from "./askRemoved.model"
import {BidRemoved} from "./bidRemoved.model"

@Entity_()
export class Punk {
    constructor(props?: Partial<Punk>) {
        Object.assign(this, props)
    }

    /**
     * Punk ID
     */
    @PrimaryColumn_()
    id!: string

    /**
     * Account that received Punk
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    transferedTo!: Account | undefined | null

    /**
     * Account that claimed Punk
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    assignedTo!: Account | undefined | null

    /**
     * Punk buyers
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    purchasedBy!: Account | undefined | null

    /**
     * Punk metadata
     */
    @Index_()
    @ManyToOne_(() => MetaData, {nullable: true})
    metadata!: MetaData | undefined | null

    /**
     * Contract data
     */
    @Index_()
    @ManyToOne_(() => Contract, {nullable: true})
    contract!: Contract | undefined | null

    /**
     * Punk tokenId
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    tokenId!: bigint

    /**
     * Current owner of Punk
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    owner!: Account

    /**
     * Wrap Status
     */
    @Column_("bool", {nullable: false})
    wrapped!: boolean

    /**
     * Current Ask for Punk
     */
    @Index_()
    @ManyToOne_(() => Ask, {nullable: true})
    currentAsk!: Ask | undefined | null

    /**
     * Current Bid for Punk
     */
    @Index_()
    @ManyToOne_(() => Bid, {nullable: true})
    currentBid!: Bid | undefined | null

    /**
     * Current AskCreated event
     */
    @Index_()
    @ManyToOne_(() => AskCreated, {nullable: true})
    currentAskCreated!: AskCreated | undefined | null

    /**
     * Current BidCreated event
     */
    @Index_()
    @ManyToOne_(() => BidCreated, {nullable: true})
    currentBidCreated!: BidCreated | undefined | null

    /**
     * Number of times Punk has been transferred
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    numberOfTransfers!: bigint

    /**
     * Number of times Punk was sold
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    numberOfSales!: bigint

    /**
     * Current AskRemoved event
     */
    @Index_()
    @ManyToOne_(() => AskRemoved, {nullable: true})
    currentAskRemoved!: AskRemoved | undefined | null

    /**
     * Current BidRemoved event
     */
    @Index_()
    @ManyToOne_(() => BidRemoved, {nullable: true})
    currentBidRemoved!: BidRemoved | undefined | null

    /**
     * Total amount spent purchasing Punk across OpenSea & Rarible marketplaces
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalAmountSpentOnPunk!: bigint

    /**
     * Average price for Punk across OpenSea & Rarible marketplaces
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    averageSalePrice!: bigint
}
