import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { UserInput } from './inputs/Userinput';
import {UpdateUser} from './inputs/updateDataInput'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signUp(createUserDto: UserInput):Promise<boolean> {
    try{
      const currentUser= await this.userModel.findOne({name:createUserDto.name})
      if(!currentUser){
        const hashedPassword=await bcrypt.hash(createUserDto.password,12)
        const createdUser = new this.userModel({name:createUserDto.name,password:hashedPassword});
        await createdUser.save();
        return true
      }
       throw new Error
    }catch(e){
      return false
    }
  }
  
  async signIn(createUserDto: UserInput):Promise<String>{
    try{
      const currentUser= await this.userModel.findOne({name:createUserDto.name})
        if(!currentUser){
          throw new Error
        }
        const isCorrect=await bcrypt.compare(createUserDto.password,currentUser.password)
        if(!isCorrect){
          throw new Error
        }
        const token=jwt.sign(
          {userId:currentUser._id},
          '124212314',
          {expiresIn:'1h'}
        )
        return token
    }catch(e){
      return null
    }     
  }
  
  //можно переписать пользователя найти можно из токена
  async deleteUser(UserName:string):Promise<boolean>{
    //проверка
    try{
      const user = await this.userModel.findOneAndDelete({name:UserName})
      if(!user){
        throw new Error
      }
      return true
    }catch(e){
      return false
    }
  }
  
  //можно переписать что б входили только данные апдейта без юзернэйм тк найти пользователя можно из токена
  async updateUser(updateData:UpdateUser):Promise<boolean>{
    try{
      const user = await this.userModel.findOneAndUpdate({name:updateData.name},{name:updateData.newName,password:updateData.newPassword})
      if(!user){
        throw new Error
      }
      return true
    }catch(e){
      return null
    }
    
  }

  async findAll(): Promise<User[]> {
     try{
        const users = this.userModel.find();
        if(!users){
          throw new Error
        }
        return users
     }catch(e){
      return null
     }
  }

  
//   async findByName(UserName:string):Promise<User>{
//     try{
//       const user = await this.userModel.findOne({name:UserName})
//       if(!user){
//         throw new Error
//       }
//       return user
//     }catch(e){
//       return null
//     }
//   }
 }
