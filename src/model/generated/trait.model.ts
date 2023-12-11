import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {TraitType} from "./_traitType"
import {MetaDataTrait} from "./metaDataTrait.model"

@Entity_()
export class Trait {
    constructor(props?: Partial<Trait>) {
        Object.assign(this, props)
    }

    /**
     * Trait
     */
    @PrimaryColumn_()
    id!: string

    @Column_("varchar", {length: 9, nullable: false})
    type!: TraitType

    @OneToMany_(() => MetaDataTrait, e => e.trait)
    metaDatas!: MetaDataTrait[]

    /**
     * Number of Punks with this trait
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    numberOfNfts!: bigint
}
