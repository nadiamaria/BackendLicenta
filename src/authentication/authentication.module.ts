import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/Users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationService } from './services/authentication.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/Users/services/user.service';
import { UserController } from 'src/Users/user.controller';
 
@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    UserService,
    UserController,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}