import { Controller, Injectable } from '@nestjs/common';
import { Get, Inject } from '@nestjs/common/decorators';
import { ClientProxy, Ctx, EventPattern, MessagePattern, Payload, RmqContext, } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { CreateUserDTO } from './dtos/CreateUser_dto';
import { UserService } from './user.service';


@Injectable()
@Controller('user')
export class UserController {

    constructor(@Inject('USER_SERVICE') private client: ClientProxy, private userservice: UserService) { }

    @MessagePattern({ cmd: 'get-users' })
    async getusers() {
        return this.client.send('get-users', this.userservice.getusers())
    }

    @MessagePattern({ cmd: 'get-user' })
    async getuser(@Payload('id') id) {
        return this.client.send('get-user', this.userservice.getuser(id))
    }

    @MessagePattern({ cmd: 'create-user' })
    async createUser(@Payload() data: CreateUserDTO, @Ctx() ctx: RmqContext) {
        return this.client.send('create-user', this.userservice.createuser(data)).pipe(timeout(5000))
    }


    @MessagePattern({ cmd: 'delete-user' })
    async DeleteUser(@Payload('id') id, @Ctx() ctx: RmqContext) {
        return this.client.send('delete-user', this.userservice.deleteuser(id)).pipe(timeout(5000))
    }

    @EventPattern('user_created')
    async publish() {
        const pattern = 'user_created'
        return this.client.emit('user_created', this.UserCreated())

    }


    async UserCreated() {
        return 'User Created'
    }

}
