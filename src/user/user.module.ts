import { Module } from '@nestjs/common';
import {  ClientsModule,Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER } from '@app/common/entitys/USER';
// import {ConfigModule} from '@nestjs/config'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    ClientsModule.register([{
    name:'USER_SERVICE',transport:Transport.RMQ
  }]),
  ConfigModule.forRoot({
    isGlobal:true,
    envFilePath: './env'
  }),
  TypeOrmModule.forFeature([USER])
],
exports:[UserService]

})
export class UserModule {}
