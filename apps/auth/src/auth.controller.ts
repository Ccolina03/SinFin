import { Controller, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { CurrentUser } from './current-user.decorator';
import { UsersDocument } from './users/models/users.schema';
import { JwtAuthGuards } from './guards/jwt-auth-guards'
import { MessagePattern } from '@nestjs/microservices';
import { Payload } from '@nestjs/microservices';

@Controller('auth') //path auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //REASON FOR UseGuards: will execute a given Guard so basically will pass a strategy to confirm if strategy works before executing this login route
  //As well, we will create a decorator to access the user after it has run through local auth guard in order to pass it as a cookie later 
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login (
    //pulled user of strategy return (which is the authenticated user)
    @CurrentUser() user: UsersDocument, 
    @Res({passthrough: true}) response: Response, //allows access to response objects so cookies can be set
  ) {
      await this.authService.login(user, response);
      response.send(user);    //cookie is set up in response now
  }


  //Idea: Through MessagePattern jwt extracted from common/lib/jwtAuthGuard and sent to useGuard here where it employs to validate and returns user which is recovered from payload (has been added to request by validate)
  @UseGuards(JwtAuthGuards)
  @MessagePattern('AuthenticateRMQ')
  async authenticate (
    @Payload() data: any
  ) {
      return data.user;   //authenticated user returned to JwtAuthGuard where is piped to the request(context) object and later pull from the request object by the CurrentUserDecorator
  }
 
}
