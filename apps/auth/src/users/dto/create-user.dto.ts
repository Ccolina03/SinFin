import {IsDate, IsEmail, IsNotEmpty, IsString, IsStrongPassword} from 'class-validator'
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
