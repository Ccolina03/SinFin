import { Controller, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { CurrentUser } from './current-user.decorator';
import { UsersDocument } from './users/models/users.schema';

@Controller('auth') //path authW
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
 
}
