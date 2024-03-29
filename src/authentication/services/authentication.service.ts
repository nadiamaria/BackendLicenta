import RegisterDto from '../dto/register.dto';
import { UserService } from '../../Users/services/user.service';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //   'JWT_EXPIRATION_TIME',
  public getCookieWithJwtToken(userId: number,email: string, name: string, role: string) {
    const payload: TokenPayload = { userId, email, name, role }; //add max age
    const token = this.jwtService.sign(payload);
    console.log(this.configService.get('JWT_EXPIRATION_TIME'));

    return {
      token: token,
      // exprSeconds: this.configService.get('JWT_EXPIRATION_TIME'),
      // exprSeconds: new Date().getTime() + ExpirationEnum.hour,
      //   new Date().getTime() + this.configService.get('JWT_EXPIRATION_TIME'),
      // JSON.stringify(
      // ),
      // +this.configService.get('JWT_EXPIRATION_TIME') * 10000,
    };
    // return token;
    // return `Authentication=${token}; Path=/; Max-Age=${this.configService.get(
    //   'JWT_EXPIRATION_TIME',
    // )}`;
  }

  public getCookieForLogOut() {
    return ` `; //TO DO invalidate token jwt
  }

  // generateToken(email: string): string {const expiresAt = JSON.stringify(new Date().getTime() + ExpirationEnum.hour,);const payload: JwtPayload = { email, expiresAt };return this.jwtService.sign(payload);}
}
export enum ExpirationEnum {
  'day' = 86400000,
  'hour' = 3600000,
}
