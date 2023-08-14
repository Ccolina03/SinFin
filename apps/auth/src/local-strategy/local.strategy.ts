//Idea: Passing JWT token in the cookie
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import {PassportStrategy} from '@nestjs/passport'
import { UsersService } from "../users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) { 
        super({usernameField: 'username'})   //username in my moongose model from users models
    } 

    async validate(username: string, password: string) {
         //Checking with usersService the existance of user. If not catch error from the one thrown in verifyUser. 
        try {
            return this.usersService.verifyUser(username, password);  
        } catch (err) {
            throw new UnauthorizedException(err);
        }
    }
}