import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {MetaData} from "./metaData.model"
import {Trait} from "./trait.model"

@Entity_()
export class MetaDataTrait {
    constructor(props?: Partial<MetaDataTrait>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => MetaData, {nullable: true})
    metaData!: MetaData

    @Index_()
    @ManyToOne_(() => Trait, {nullable: true})
    trait!: Trait
}
