import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { localstrategy } from './guards/local/local.strategy';
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt'
import { jwtstrategy } from './guards/jwt/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,localstrategy,jwtstrategy],
  imports:[UserModule,PassportModule,JwtModule.register({
    secret:'amirns5311',
    signOptions:{expiresIn:'1h'}
  })]
})
export class AuthModule {}
