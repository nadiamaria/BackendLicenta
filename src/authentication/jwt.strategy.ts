import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { TokenPayload } from './tokenPayload.interface';
import { UserService } from 'src/Users/services/user.service';

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.headers) {
    const cookies = req.headers['set-cookie'];
    const words = cookies.split('=');
    token = words[0];
  }
  Logger.log('token = ' + typeof token);
  Logger.log('header = ' + req.headers);
  console.log(req.headers);

  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      // ExtractJwt.fromExtractors([
      //   (request: Request) => {
      //     Logger.log('ceva');
      //     return request?.cookies?.Authentication;
      //   },
      // ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    return this.userService.getById(payload.userId);
  }
}
