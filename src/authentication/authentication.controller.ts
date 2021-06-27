import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { AuthenticationService } from './services/authentication.service';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { ConfigService } from '@nestjs/config';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(
      user.id,
      user.email,
      user.role,
    );
    console.log(this.configService.get('JWT_EXPIRATION_TIME'));
    response.cookie('authorization', cookie.token, {
      httpOnly: false,
      secure: false,
      maxAge: this.configService.get('JWT_EXPIRATION_TIME') * 100,
    });
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    console.log('etc');
    response.cookie(
      'authorization',
      this.authenticationService.getCookieForLogOut(),
      {
        httpOnly: false,
        secure: false,
      },
    );
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
