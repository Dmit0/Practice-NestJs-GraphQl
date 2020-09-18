import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {Data,DataSchema} from '../schemas/contactData.schema'
import {User,UserSchema} from '../schemas/user.schema'
import {BookResolver} from './book.resolver';
import {BookService} from './bookservice';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:Data.name, schema: DataSchema},
            {name:User.name,schema:UserSchema}
        ]),
    ],
    providers:[BookResolver,BookService]
})
export class BookModule{}

