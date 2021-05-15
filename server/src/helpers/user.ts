import { Room } from '../models/Room';

const addUser = async (userId: string, name: string, room: string) => {
    try {
        const isRoom = await Room.findOne({ name: String(room).trim() });

        if (isRoom) {
            const id = isRoom._id;
            const newUser = { id: userId, name }
            const updated = await Room.findByIdAndUpdate(id, { $push: { users: newUser } }, { new: true });
            return ({ err: false, data: updated });


        } else {
            return ({ err: 'Room not found' });
        }

    } catch (error) {
        return ({ err: error });
    }
}

const getUser = async (userId: string) => {
    try {
        const user = await Room.findOne({ "users": { $elemMatch: { id: userId } } }, { 'users.$': 1, 'name': 1,'roomId':1  });

        if (user) {
            return user;

        } else {
            return false;
        }

    } catch (error) {
        return ({ err: error });
    }
}
const getUserbyName = async (roomId: string, name: string) => {
    try {
        const user = await Room.findOne({ roomId, "users": { $elemMatch: { name: name } } }, { 'users.$': 1, 'name': 1,'roomId':1 });

        if (user) {
            return user;

        } else {
            return false;
        }

    } catch (error) {
        return ({ err: error });
    }
}

const removeUser = async (name: string, room: string) => {
    try {
        const isRoom = await Room.findOne({ name: String(room).trim() });
        if (isRoom) {
            const id = isRoom._id;
            const updated = await Room.findByIdAndUpdate(id, { $pull: { users: String(name).trim() } }, { new: true });
            return ({ msg: 'User Remmoved', data: updated });
        } else {
            return ({ msg: 'Room not found' });
        }

    } catch (error) {
        return new Error(error)
    }
}
const saveMessage = async (roomId: string, message: any) => {
    try {
        const isRoom = await Room.findOne({ roomId: String(roomId).trim() });
        if (isRoom) {
            const id = isRoom._id;
            const updated = await Room.findByIdAndUpdate(id, { $push: { messages: message } }, { new: true });
            return ({ msg: 'User Remmoved', data: updated });
        } else {
            return ({ msg: 'Room not found' });
        }

    } catch (error) {
        return new Error(error)
    }
}

export { addUser, removeUser, getUser, saveMessage, getUserbyName };