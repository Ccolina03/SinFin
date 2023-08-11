import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {Post , Body} from '@nestjs/common';

//path for now: localhost3000/users/
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDto ) {
       return this.usersService.create(createUserDTO);
    }
}
