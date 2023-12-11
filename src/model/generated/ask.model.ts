import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {Punk} from "./punk.model"
import {AskCreated} from "./askCreated.model"
import {AskRemoved} from "./askRemoved.model"
import {OfferType} from "./_offerType"

@Entity_()
export class Ask {
    constructor(props?: Partial<Ask>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    /**
     * Account that created Ask
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    from!: Account

    /**
     * Open Status of Punk. Asks can be either Open or Closed
     */
    @Column_("bool", {nullable: false})
    open!: boolean

    /**
     * Ask for Punk in ETH
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount!: bigint

    /**
     * Punk being offered for sale
     */
    @Index_()
    @ManyToOne_(() => Punk, {nullable: true})
    nft!: Punk | undefined | null

    /**
     * Ask created at
     */
    @Index_()
    @ManyToOne_(() => AskCreated, {nullable: true})
    created!: AskCreated | undefined | null

    /**
     * Ask removed at
     */
    @Index_()
    @ManyToOne_(() => AskRemoved, {nullable: true})
    removed!: AskRemoved | undefined | null

    @Column_("varchar", {length: 3, nullable: false})
    offerType!: OfferType
}
