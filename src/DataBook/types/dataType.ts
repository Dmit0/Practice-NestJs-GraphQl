import { Field,ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DataType{

    @Field()
    _id:string;
   
    @Field()
    telephoneNumber:string;
    
    @Field()
    email:string;

}