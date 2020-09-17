// import {AuthService} from '../authservice';
// import { User } from '../user.schema';
// import { Model } from 'mongoose';

// describe('AuthService', () => { 

//     let authService:AuthService;
//     const EmptyUser=null
//     const ReturnUser={
//       _id:"932749382714093271",
//       name:'qwerty',
//       password:'32974732'
//     }
    
//     beforeEach(() => {
//         authService = new AuthService(User);
//     });
    
//     describe('create user', () => {
//         it('should create a user', async () => {
//             jest.spyOn(AuthService, 'findOne').mockImplementation(() =>EmptyUser);
//             const result = authService.signUp({name:'qwer',password:'123'})
//             expect(result).toBeDefined()
//         });
//     });
// });