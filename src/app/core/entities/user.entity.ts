import { Types } from 'mongoose';

export class User {
  public _id?: Types.ObjectId;
  public email: string;
  public name: string;
  public password: string;
  public api_key: string;
  public created_at: Date;
  public updated_at: Date;
}
