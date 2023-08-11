//Idea: Passing JWT token in the cookie
import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-jwt";
import {PassportStrategy} from '@nestjs/passport'
import { UsersService } from "../users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) { 
        super({usernameField: 'username'})   //username in my moongose model from users models
    } 

    async validate(username: string, password: string) {
         //UsersService method to validate both props being passed on and its existance in our database. Users because in this collection we persist that information
        return this.usersService.verifyUser(username, password);  
    }
}