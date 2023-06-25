import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dtos/CreateUser_dto';
import { UserService } from 'src/user/user.service';
import { localauthguard } from './guards/local/local.guard';
import { JwtService } from '@nestjs/jwt';
import { logindto } from './dto/logindto';
import { jwtauthguard } from './guards/jwt/jwt.guard';

@Controller('auth')
export class AuthController {

    constructor(private userservice:UserService,private jwtservice:JwtService){}

    @Post('/register')
    async register(@Body() data:CreateUserDTO){
        const user=await this.userservice.createuser(data)
        return user
    }

    @Post('login')
    @UseGuards(localauthguard)
    async login(@Body() data:logindto,@Request() rqs){
        const jwttoken=await this.jwtservice.sign({
            id:rqs.user.id,
            username:rqs.user.username,
            email:rqs.user.email
        })

        return jwttoken
    }


    @Post('profile')
    @UseGuards(jwtauthguard)
    async seeprofile(){

    }
}
