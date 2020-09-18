import {UserService} from '../userservice';
//import { User } from '../../schemas/user.schema';
//import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { UserInput } from '../inputs/Userinput';
describe('UserService', () => { 

    let userService:UserService;
    


    const nonValidUser=null
    
    const validUser={
        name:'qwer',
        password:'123214'
    }

    const sameUser={
        name:'qwerty',
        password:'32974732'
    }

    
    const ReturnUser={
      _id:"932749382714093271",
      name:'qwerty',
      password:'32974732'
    }

    class mockUserService{
        signUp(createUserDto: UserInput):boolean{
            if((!createUserDto || !createUserDto.name || !createUserDto.password) || createUserDto.name===ReturnUser.name){
                return false
            }
            else return true
        }  
        
        signIn(createUserDto: UserInput):string{
            if((!createUserDto || !createUserDto.name || !createUserDto.password)||(createUserDto.name!==ReturnUser.name || createUserDto.password!==ReturnUser.password)){
                return null
            }
            let token='21`142112`3'
            return token
        }
    }
    
    beforeEach(async() => {
        const moduleRef=await Test.createTestingModule({
            providers:[
                {
                    provide:UserService,
                    useClass:mockUserService
                }
            ]
        }).compile()
        userService=moduleRef.get<UserService>(UserService)
    });
    
    describe('signUp', () => {
        it('should create a user if you send valid data',async() => {
            const response = await userService.signUp(validUser)
            expect(response).toBeTruthy()
        });
        it('shouldnt create the same user',async() => {
            const response = await userService.signUp(sameUser)
            expect(response).toBeFalsy()
        });
        it('shouldnt create a user if you send nonvalid data',async() => {
            const response = await userService.signUp(nonValidUser)
            expect(response).toBeFalsy()
        });
    });

    describe('signIn',()=>{
        it('should return token if login is succes',async()=>{
            const response = await userService.signIn(sameUser)
            expect(response).not.toBeNull()
        })
        it('should return an error if some parametrs are wrong',async()=>{
            const response = await userService.signIn(nonValidUser)
            const response1 = await userService.signIn(validUser)
            expect(response).toBeNull()
            expect(response1).toBeNull()
        })  
    })
});