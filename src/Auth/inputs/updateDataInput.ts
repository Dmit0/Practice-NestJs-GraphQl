import { Field,InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUser{
    @Field()
    name:string;

    @Field()
    newName:string;

    @Field()
    newPassword:string;
}