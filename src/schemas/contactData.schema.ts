import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

@Schema()
export class Data extends Document {
  @Prop({unique:true,require:true})
  telephoneNumber: string;
  
  @Prop({require:true})
  email: string;

  @Prop()
  owner:{type:Types.ObjectId,ref:"User"}

}

export const DataSchema = SchemaFactory.createForClass(Data);