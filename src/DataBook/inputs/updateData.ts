import { Field,InputType } from '@nestjs/graphql';

@InputType()
export class UpdateData{
   
    @Field()
    newTelephoneNumber:string;
    
    @Field()
    newEmail:string;

}