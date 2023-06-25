import { PassportStrategy } from "@nestjs/passport";
import {Strategy } from 'passport-local'
import { UserService } from "src/user/user.service";
import { Injectable } from '@nestjs/common'
@Injectable()
export class localstrategy extends PassportStrategy(Strategy){

    constructor(private userservice:UserService){
        super()
    }

    async validate(username:string,password:string){
        const user= await this.userservice.validatelocal(username,password)
        return user
    }
}