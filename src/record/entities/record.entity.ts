import { CommonBaseEntity } from './../../common/common-base.entity';
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({name: 'record'})
export class RecordEntity extends CommonBaseEntity{

    @Column({nullable: false})
    message: string

    @Column({nullable: false})
    author: string

    @ManyToOne(() => UserEntity, user => user.records)
    user: UserEntity
}
