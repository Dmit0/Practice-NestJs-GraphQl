import {Resolver,Args,Query,Mutation} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common';
import {DataType} from './types/dataType'
import {BookService} from './bookservice'
import{UpdateData} from './inputs/updateData'
import {AuthenticateGuard} from '../AuthGuard'
@Resolver()
export class BookResolver{
    constructor(private bookeService:BookService){}
    
    @UseGuards(AuthenticateGuard)
    @Query(()=>DataType)
    async getData(@Args('data') data:string){
        return this.bookeService.getContactsData(data)
    }

    @UseGuards(AuthenticateGuard)
    @Mutation(()=>Boolean)
     async UpdateUser(@Args('dataForUpdate') dataForUpdate:UpdateData){
         //юзера взять из токена
         return this.bookeService.updateData(dataForUpdate)
     }
    
}