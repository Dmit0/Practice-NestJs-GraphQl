import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { GraphQLModule } from '@nestjs/graphql';
import {AuthResolver} from './auth.resolver'
import {User,UserSchema} from '../user.schema'
import {AuthService} from './authservice'
@Module({
    imports:[
        MongooseModule.forFeature([{ name:User.name, schema: UserSchema }])
    ],
    providers: [AuthResolver,AuthService]
})
export class AuthModule {}
