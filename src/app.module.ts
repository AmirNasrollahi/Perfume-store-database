import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import { USER } from '@app/common/entitys/USER';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: './env'
    }),TypeOrmModule.forRoot({
      type:'postgres',
        host:'localhost',
        port:5432,
        username:'postgres',
        password:'',
        database:'test',
        entities:[USER],
        synchronize:true
    }), AuthModule
  ],
})
export class AppModule {
  
}
