import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly UsersRepository: UsersRepository) {} 

    create(createUserDTO: CreateUserDto) {
        return this.UsersRepository.create(createUserDTO);
    }
}
