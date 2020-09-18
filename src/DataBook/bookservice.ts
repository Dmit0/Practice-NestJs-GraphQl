import { Model } from 'mongoose';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Data } from '../schemas/contactData.schema';
import {DataType} from './types/dataType'
import {AuthenticateGuard} from '../AuthGuard'
import { User } from '../schemas/user.schema';
import {UpdateData} from './inputs/updateData'

@Injectable()
export class BookService{
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Data.name) private dataModel: Model<Data>
        ){}
    
    @UseGuards(AuthenticateGuard)
    async getContactsData(UserName:string):Promise<DataType>{       
        try{
            const user = await this.userModel.findOne({name:UserName})
            if(!user){
                throw new Error
            }
            const dataUser = await this.dataModel.findOne({owner:user._id})
            if(!dataUser){
                throw new Error
            }
            return dataUser
        }catch(e){
            return null
        }
    }
    
    
    @UseGuards(AuthenticateGuard)
    async updateData(updateData:UpdateData):Promise<boolean>{
        try{
            const updatedata=await this.dataModel.findOne({},{})
            if(!updatedata){
                throw new Error
            }
            else return true
        }catch(e){
            return false
        }
    }

    
}