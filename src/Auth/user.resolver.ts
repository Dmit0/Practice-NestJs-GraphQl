import {Resolver,Mutation,Args,Query} from '@nestjs/graphql'
import {UserService} from './userservice'
import {UseGuards } from '@nestjs/common';
import {UserType} from './types/UserType.dto'
import {UserInput} from './inputs/Userinput'
import {UpdateUser} from './inputs/updateDataInput'
@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {} 
    
    @Query(()=>String)
      async signIn(@Args('userData') userData:UserInput){
        return this.userService.signIn(userData)
      }

    @Query(()=>[UserType])
      async getAllUsers(){
        return this.userService.findAll()
      }
      
    @Mutation(()=>Boolean)
     async signUp(@Args('userData') userData:UserInput){
         return this.userService.signUp(userData)
     }

    @UseGuards(AuthenticateGuard)
    @Mutation(()=>Boolean)
     async DeleteUser(@Args('userName') userName:string){
         return this.userService.deleteUser(userName)
     }

     @Mutation(()=>Boolean)
     async UpdateUser(@Args('userForUpdate') userForUpdate:UpdateUser){
         return this.userService.updateUser(userForUpdate)
     }
  }
