import { Injectable } from "@nestjs/common/decorators";
import { IsString } from "class-validator";
import { IsEmail, IsNumber, Length } from "class-validator/types/decorator/decorators";

@Injectable()
export class CreateUserDTO{
    @IsString()
    @Length(5,30)
    username:string

    
    @IsNumber()
    // @Length(4,20)
    password:string

    @IsEmail()
    email:string
}