import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { UserService } from "src/user/user.service";
import { ExtractJwt } from "passport-jwt";
import { Injectable } from '@nestjs/common'

@Injectable()
export class jwtstrategy extends PassportStrategy(Strategy) {

    constructor(private userservice: UserService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: 'amirns5311'
            }
        )
    }

    async validate(jwttoken:any) {
        return jwttoken
    }
}