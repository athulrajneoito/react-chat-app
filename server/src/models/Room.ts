import { Model, model, Schema } from "mongoose";

import { RoomInterface } from "../interfaces";

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
    users: [{
        id: { type: String },
        name: { type: String },

    }]
});

export const Room: Model<RoomInterface> = model('Room', roomSchema);
