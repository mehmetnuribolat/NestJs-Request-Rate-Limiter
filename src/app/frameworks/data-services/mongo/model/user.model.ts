import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Types, Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id?: Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop()
  public name!: string;

  @Prop()
  public password!: string;

  @Prop()
  public api_key!: string;

  @Prop({ default: now() })
  public created_at: Date;

  @Prop({ default: now() })
  public updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
