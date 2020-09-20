import {UserService} from '../userservice';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { UserInput } from '../inputs/Userinput';
import { getModelToken } from '@nestjs/mongoose';
describe('UserService', () => { 
   
    let userService:UserService;

    const emptyUser=false
    
    const nonValidUser={
        name:'',
        password:'12414412'
    }
    
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

    

    class mockModel {
            constructor(public data?: any) {} 
            save() {
                return this.data;
            }  
            static findOne() {
                return ;
            }
        }   
    describe('signUp', () => {  
        beforeEach(async() => { 
                const moduleRef=await Test.createTestingModule({
                    providers:[
                        UserService,
                        {
                            provide:getModelToken(User.name),
                            useValue:mockModel,
                        }
                    ]
                }).compile()
                userService=moduleRef.get<UserService>(UserService)
            });

        describe('sign up if user is not exist',()=>{
            jest.spyOn(mockModel, 'findOne').mockImplementation(() => emptyUser);
            it('should create a user if you send valid data',async() => {
                const response = await userService.signUp(validUser)
                expect(response).toBeTruthy()
            });
        })

        describe('sign up if user exist',()=>{
            jest.spyOn(mockModel, 'findOne').mockImplementation(() => sameUser);
            it('shouldnt create the same user',async() => {
                const response = await userService.signUp(sameUser)
                expect(response).toBeFalsy()
            });
        })  
        
    });

    // describe('signIn',()=>{
    //     it('should return token if login is succes',async()=>{
    //         const response = await userService.signIn(sameUser)
    //         expect(response).not.toBeNull()
    //     })
    //     it('should return an error if some parametrs are wrong',async()=>{
    //         const response = await userService.signIn(nonValidUser)
    //         const response1 = await userService.signIn(validUser)
    //         expect(response).toBeNull()
    //         expect(response1).toBeNull()
    //     })  
    // })
});
