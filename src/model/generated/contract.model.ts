import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Contract {
    constructor(props?: Partial<Contract>) {
        Object.assign(this, props)
    }

    /**
     * Contract Address
     */
    @PrimaryColumn_()
    id!: string

    /**
     * Token Symbol
     */
    @Column_("text", {nullable: true})
    symbol!: string | undefined | null

    /**
     * Token name
     */
    @Column_("text", {nullable: true})
    name!: string | undefined | null

    /**
     * Total supply of tokens
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalSupply!: bigint

    /**
     * Total number of Punk sales
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalSales!: bigint

    /**
     * Total Sales in ETH for Punks
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalAmountTraded!: bigint

    /**
     * The hash of the composite image of all the Punks
     */
    @Column_("text", {nullable: true})
    imageHash!: string | undefined | null
}
