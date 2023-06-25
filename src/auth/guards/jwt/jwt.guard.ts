import {AuthGuard} from '@nestjs/passport'

import { Injectable } from '@nestjs/common'
@Injectable()
export class jwtauthguard extends  AuthGuard('jwt'){}