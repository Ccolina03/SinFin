import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs'
import { getUserDTO } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {} 

    async create(createUserDTO: CreateUserDto) {
        return this.usersRepository.create({
            ...createUserDTO, 
            //hash password for extra security with 3rd party: bcrypt
            password: await bcrypt.hash(createUserDTO.password, 10)      
        });
    }

    async verifyUser(username: string, password: string) {
        const user = await this.usersRepository.findOne({username});  //async communication with database
        const passwordIsValid = await bcrypt.compare(password, user.password); //comparing username input is async operation too
        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid');
        }
    return user;          //return user with all its properties if user exists
    }

    async getUser(getUserDTO: getUserDTO )  {
        return await this.usersRepository.findOne(getUserDTO);
    }
}
