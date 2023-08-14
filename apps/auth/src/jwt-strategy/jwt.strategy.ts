import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Request } from "express";
import { ExtractJwt } from "passport-jwt";
import { TokenPayload } from "../interfaces/token-payload.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    //Idea: Validate jwt token from _id 
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        //Setup Passport Strategy and further customize with:
        super(
            {   
                //fromExtractors: creates an extractor that tries a list of extractor function to extract the jwt
                jwtFromRequest: ExtractJwt.fromExtractors(
                    [(request: Request) =>
                        request?.cookies?.Authentication
                    ]),
                //secret to decode JWT 
                secretOrKey: configService.get<string>('JWT_SECRET'),
            }   
        )
    }

    //validate function to verify jwt using _id from user since I used payload with _id to generate the token
    //Creating interface for parameter userId
    async validate ({userId}: TokenPayload) {
        return this.usersService.getUser({_id: userId}); //userId is an object property that is the value of the prop name _id
    }
}