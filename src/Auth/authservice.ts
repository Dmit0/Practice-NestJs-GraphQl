import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { UserInput } from './inputs/Userinput';
import {UserType} from './dto/UserType.dto'

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signUp(createUserDto: UserInput):Promise<boolean> {
    const currentUser= await this.userModel.findOne({name:createUserDto.name})
    if(!currentUser){
      const createdUser = new this.userModel(createUserDto);
      await createdUser.save();
      return true
    }
    return false
  }
  
  async signIn(createUserDto: UserInput):Promise<UserType>{
    const currentUser= await this.userModel.findOne({name:createUserDto.name})
    if(!currentUser){
      return null
    }
    if(currentUser.password===createUserDto.password){
      return currentUser
    }
  }
  
  async deleteUser(UserName:string):Promise<boolean>{
    //проверка
    const user = await this.userModel.findOneAndDelete({name:UserName})
    return !!user
  }

  // async updateUser(checkUserDto:UserInput):Promise<User>{
  //   //добавить апдейт данные
  //   const user = await this.userModel.findOneAndUpdate({name:checkUserDto.name},{})
  //   return user
  // }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }


}
