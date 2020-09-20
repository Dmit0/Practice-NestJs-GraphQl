import {UserService} from '../userservice';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { UserInput } from '../inputs/Userinput';
import { getModelToken } from '@nestjs/mongoose';
describe('UserService', () => { 
   
    let userService:UserService;

    const emptyUser=null
    
    const validUser={
        name:'qwer',
        password:'123214'
    }

    const sameUser={
        name:'qwerty',
        password:'32974732'
    }
    const updateUser={
        name:'qwer',
        newName:'123',
        newPassword:'98213'
    }
    const validUsers=[
        {name:'qwer',newName:'123',newPassword:'98213'},
        {name:'qwer1',newName:'123',newPassword:'98213'}
    ]

    
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
                return
            }
            static findOneAndDelete(){
                return
            }
            static findOneAndUpdate(){
                return
            }
            static find(){
                return
            }
        } 
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
    
        describe('signUp', () => {  
       
            it('should create a user if you send valid data',async() => {
                jest.spyOn(mockModel, 'findOne').mockImplementation(() => emptyUser);
                const response = await  userService.signUp(validUser)
                expect(response).toBeTruthy()
            });
            it('shouldnt create the same user',async() => {
                jest.spyOn(mockModel, 'findOne').mockImplementation(() => sameUser);
                const response = await userService.signUp(sameUser)
                expect(response).toBeFalsy()
            }); 
    });

    describe('signIn',()=>{
        it('should return token if login is succes',async()=>{
            jest.spyOn(mockModel, 'findOne').mockImplementation(() => sameUser);
            const response = await userService.signIn(sameUser)
            expect(response).not.toBeNull()
        })
        it('should return an error if no such user',async()=>{
            jest.spyOn(mockModel, 'findOne').mockImplementation(() => emptyUser);
            const response1 = await userService.signIn(validUser)
            expect(response1).toBeNull()
        }) 
        it('should return an error if password wrong',async()=>{
            jest.spyOn(mockModel, 'findOne').mockImplementation(() => ReturnUser);
            const response1 = await userService.signIn(validUser)
            expect(response1).toBeNull()
        })  
    })

    describe('delete',()=>{
        it('should delete if this uoser exist and ',async()=>{
            jest.spyOn(mockModel, 'findOneAndDelete').mockImplementation(() => sameUser);
            const response = await userService.deleteUser(sameUser.name)
            expect(response).toBeTruthy()
        })
        it('should return an error if no such user or it wasnt deleted',async()=>{
            jest.spyOn(mockModel, 'findOneAndDelete').mockImplementation(() => emptyUser);
            const response1 = await userService.signIn(validUser)
            expect(response1).not.toBeTruthy()
        })   
    })
    describe('updateUser',()=>{
        it('should delete if this user exist and ',async()=>{
            jest.spyOn(mockModel, 'findOneAndDelete').mockImplementation(() => validUser);
            const response = await userService.updateUser(updateUser)
            expect(response).toBeTruthy()
        })

        //тест на пустые поля (не обработается graphQl)


        it('should return an error if no such user or it wasnt deleted',async()=>{
            jest.spyOn(mockModel, 'findOneAndDelete').mockImplementation(() => emptyUser);
            const response1 = await userService.updateUser(updateUser)
            expect(response1).not.toBeTruthy()
        })   
    })

    describe('findall',()=>{
        it('should return all users ',async()=>{
            jest.spyOn(mockModel, 'find').mockImplementation(() => validUsers);
            const response = await userService.findAll()
            expect(response).toBeDefined()
        })  
    })

    
});
