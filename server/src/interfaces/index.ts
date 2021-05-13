import { Document } from "mongoose";

export interface RoomInterface extends Document {
    name: string;
    createdBy: string;
    users: Array<user>;
  }
interface user {
    id:string,
    name:string
}