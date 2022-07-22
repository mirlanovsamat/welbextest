import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @Length(6, 16, {
        message: 'Passwords length should be less than 17 and more than 5',
    })
    @ApiProperty()
    password: string
}
