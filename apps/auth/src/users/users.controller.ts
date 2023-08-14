import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {Post , Body, Get} from '@nestjs/common';
import { JwtAuthGuards } from '../guards/jwt-auth-guards';
import { UsersDocument } from './models/users.schema';
import { CurrentUser } from '../current-user.decorator';
import { UseGuards } from '@nestjs/common';

//path for now: localhost3000/users/
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDto ) {
       return this.usersService.create(createUserDTO);
    }

    //Protected route because using JwtAuthGuards to authenticate this request
    //getUser request goes to JwtStrategy, if valid JWT then authenticated user attached to request. CurentUser decorator pulls the user from the request to return it.
    //Cookie-parser added as middleware. 
    @UseGuards(JwtAuthGuards)
    @Get()
    async getUser(
        @CurrentUser() user: UsersDocument
    ) {
        return user; 
    }
}
