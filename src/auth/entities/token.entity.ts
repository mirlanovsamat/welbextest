import { CommonBaseEntity } from './../../common/common-base.entity';
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'token'})
export class TokenEntity extends CommonBaseEntity{

    @ApiProperty()
    @Column({nullable: false})
    refreshToken: string;

    @ApiProperty()
    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity
}