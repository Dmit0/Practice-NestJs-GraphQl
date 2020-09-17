import {Resolver,Mutation,Args,Query} from '@nestjs/graphql'
import {AuthService} from './authservice'
import {UserType} from './types/UserType.dto'
import {UserInput} from './inputs/Userinput'
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {} 
    
    @Query(()=>UserType)
      async signIn(@Args('userData') userData:UserInput){
        return this.authService.signIn(userData)
      }

    @Mutation(()=>Boolean)
     async signUp(@Args('userData') userData:UserInput){
         return this.authService.signUp(userData)
     }
     @Mutation(()=>Boolean)
     async DeleteUser(@Args('userName') userName:string){
         return this.authService.deleteUser(userName)
     }
  }
