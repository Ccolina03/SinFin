import { Injectable } from '@nestjs/common';
import { UsersDocument } from './users/models/users.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService, 
    private readonly jwtService: JwtService) {}

  async login(user: UsersDocument, response:Response) {
    const JWTTokenPayload: TokenPayload = {
        userId: user._id.toHexString(), //adding a userId property to the response
    }
    const willExpire = new Date();
    willExpire.setSeconds(  //setting the time it should expire: Adding curr expires time when creating + whatever env variable in seconds say
      willExpire.getSeconds() + this.configService.get('JWT_EXPIRATION')
    )

    const generatedToken = this.jwtService.sign(JWTTokenPayload); //generate token based on payload (userId in this case)
    response.cookie("Authentication", generatedToken, { //token kept in http cookie called Authentication
        httpOnly: true,              //to make sure cookie is only available at HTTP request so that ppl can deal with cookie on client side without sending requests
        expires: willExpire,       //set expiration date to cookie
    })

    return generatedToken;   //token passed on as a cookie 
  }

  
}
