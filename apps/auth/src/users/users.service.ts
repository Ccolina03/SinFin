import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {} 

    async create(createUserDTO: CreateUserDto) {
        return this.usersRepository.create(createUserDTO);
    }
}
