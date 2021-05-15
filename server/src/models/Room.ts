import { Model, model, Schema } from "mongoose";

import { RoomInterface } from "../interfaces";
import { customAlphabet} from 'nanoid';
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

const roomSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    roomId:{
        type: String,
        default: () => nanoid()
    },
    users: [{
        id: { type: String },
        name: { type: String },
        createdAt:{type:Date,default:Date.now()}

    }],
    messages:[
        {
            type:{ type: String },
            user:{ type: String },
            text:{ type: String },
            createdAt:{type:Date,default:Date.now()}
        }
    ]
},{timestamps:true});

export const Room: Model<RoomInterface> = model('Room', roomSchema);
