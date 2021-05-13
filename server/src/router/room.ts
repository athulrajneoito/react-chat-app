import { Router, Request, Response } from 'express';
import { Room } from '../models/Room';

export const roomRouter = Router();


roomRouter.get('/getallUsers', async (req: Request, res: Response) => {
    try {
        const name = req.body;
        const room = await Room.findOne({ name });
        if (!room) {
            return res.status(400).send('Room didnt exists');
        }
        const users = Room.find({ name }).select('users');
        return res.status(200).json({ msg: 'Room Created', users });
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
});
roomRouter.post('/createRoom', async (req: Request, res: Response) => {
    try {
        const { name, createdBy } = req.body;
        const newRoom = new Room({
            name, createdBy
        });
        const room = await Room.findOne({ name });
        if (room) {
            return res.status(400).send('Room already exists');
        }
        const data = await newRoom.save();
        return res.status(201).json({ msg: 'Room Created', data });
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
});

roomRouter.patch('/addUser', async (req: Request, res: Response) => {

    try {
        const { name, room } = req.body;
        const isRoom = await Room.findOne({ name: String(room).trim() });
        if (isRoom) {
            const id = isRoom._id;
            const updated = await Room.findByIdAndUpdate(id, { $push: { users: String(name).trim() } }, { new: true });
            return res.status(201).json({ msg: 'User Added', data: updated });
        } else {
            return res.status(404).json({ msg: 'Room not found' });
        }

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
});


roomRouter.patch('/removeUser', async (req: Request, res: Response) => {

    try {
        const { name, room } = req.body;
        const isRoom = await Room.findOne({ name: String(room).trim() });
        if (isRoom) {
            const id = isRoom._id;
            const updated = await Room.findByIdAndUpdate(id, { $pull: { users: String(name).trim() } }, { new: true });
            return res.status(201).json({ msg: 'User Removed', data: updated });
        } else {
            return res.status(404).json({ msg: 'Room not found' });
        }

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
});

roomRouter.get('/getUser', async (req: Request, res: Response) => {
    const { room, userId } = req.body;

    try {
        const user = await Room.findOne({ "users": { $elemMatch: { id: userId } } }, { 'users.$': 1,'name':1 });

        if (user) {
            return res.send({ err: false, data: user });

        } else {
            return ({ err: 'User not found' });
        }

    } catch (error) {
        return ({ err: error });
    }
});




