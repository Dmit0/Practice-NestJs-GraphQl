import { Field,InputType } from '@nestjs/graphql';

@InputType()
export class DataInput{
   
    @Field()
    telephoneNumber:string;
    
    @Field()
    email:string;

}