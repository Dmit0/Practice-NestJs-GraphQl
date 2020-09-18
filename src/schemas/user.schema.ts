import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({unique:true,require:true,})
  name: string;
  
  @Prop({require:true})
  password: string;

  @Prop()
  personalData:{type:Types.ObjectId,ref:"Data"}

}

export const UserSchema = SchemaFactory.createForClass(User);