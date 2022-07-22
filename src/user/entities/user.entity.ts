import { RecordEntity } from './../../record/entities/record.entity';
import { CommonBaseEntity } from './../../common/common-base.entity';
import { Column, Entity, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'user'})
export class UserEntity extends CommonBaseEntity{

    @ApiProperty()
    @Column({unique: true, nullable: false})
    email: string;

    @ApiProperty()
    @Column({ nullable: false})
    name: string;

    @ApiProperty()
    @Column({nullable: false})
    password: string;

    @ApiProperty()
    @Column({default: false})
    isActivated: boolean;

    @ApiProperty()
    @Column()
    activationLink: string;

    @ApiProperty()
    @OneToMany(() => RecordEntity, record => record.user)
    records: RecordEntity[];
}
