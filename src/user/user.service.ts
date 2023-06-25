import { USER } from '@app/common/entitys/USER';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/CreateUser_dto';
@Injectable()
export class UserService {

    constructor(@InjectRepository(USER) private userrepository:Repository<USER> ){}


    async createuser(User:CreateUserDTO){
        const user= await this.userrepository.create({
            username:User.username,
            password:User.password,
            email:User.email,
            createdat:new Date()
        })

        await this.userrepository.save(user)
        return user
    }


    async getusers(){
        const users= await this.userrepository.find()
        return users
    }

    async getuser(userid:number){
        const User=await this.userrepository.findOne({
            where:{
                id:userid
            }
        })
        return User
    }

    async deleteuser(userid:number){
        await this.userrepository.delete({id:userid})
    }

    async validatelocal(username:string,password:string){
        const user=await this.userrepository.findOne({
            where:{
                username:username
            }
        })

        if(!user){
            return new BadRequestException()
        }

        if(user.password!=password){
            return new UnauthorizedException()
        }

        return user
    }

}
