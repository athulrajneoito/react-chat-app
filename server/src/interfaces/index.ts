import { Document } from "mongoose";

export interface RoomInterface extends Document {
    name: string;
    roomId:string;
    createdBy: string;
    users: Array<user>;
    messages:Array<messages>
  }
interface user {
    id:string,
    name:string,
    createdAt:Date,
}
interface messages {
    type:string,
    user:string,
    text:string,
    createdAt:Date,
}