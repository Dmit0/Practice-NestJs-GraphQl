import { Field,ObjectType,ID } from '@nestjs/graphql';


@ObjectType()
export class UserType{
    
    @Field(()=>ID)
    _id:string

    @Field()
    name:string;
    
    @Field()
    password:string;

    @Field()
    telephoneNumber:string

}