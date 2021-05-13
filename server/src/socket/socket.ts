
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { RoomInterface } from "~/interfaces";
import { addUser, getUser } from "../helpers/user";

export const initialize = (app: any) => {
    const httpServer = createServer(app);

    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ["GET", "POST", "PATCH"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        socket.on('join', async (name, room, callback) => {
            const res = await addUser(socket.id, name, room);
            if (res.err) callback({ err: res.err });


            const roomData: RoomInterface | null | undefined = res.data;
            socket.emit('message', { user: roomData?.createdBy, text: `${name},'welcome to the room` });
            socket.broadcast.to(room).emit('message', { user: roomData?.createdBy, text: `${name}'has joined` });

            await socket.join(room);
            callback()

        });
        socket.on('sendMessage', async (message, callback) => {
            let user: any = await getUser(socket.id);
            if (user && user !== undefined) {

                user = user.data;

                io.to(user.name).emit('message', { user: user.users[0].name, text: message });
                callback({ status: 'ok' })
            }
        })
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
    return httpServer;
}

