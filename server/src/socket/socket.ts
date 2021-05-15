
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { RoomInterface } from "~/interfaces";
import { addUser, getUser, getUserbyName, saveMessage } from "../helpers/user";

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
        socket.on('join', async (name, room, roomId, callback) => {
            const isUserPresent = await getUserbyName(roomId, name);
            if (!isUserPresent) {
                const res = await addUser(socket.id, name, room);
                if (res.err) callback({ err: res.err });
                const roomData: RoomInterface | null | undefined = res.data;
                const welcomeMessage = { type: 'admin', user: roomData?.createdBy, text: `${name},welcome to the room` };
                const joinMessage = { type: 'admin', user: roomData?.createdBy, text: `${name},has joined` };
                await saveMessage(roomId, welcomeMessage);
                socket.emit('message', { ...welcomeMessage });
                // await saveMessage(roomId, joinMessage);
                socket.broadcast.to(room).emit('message', { ...joinMessage });

                await socket.join(room);
                callback()
            } else {
                await socket.join(room);
                callback()
            }


        });
        socket.on('sendMessage', async (message, userName, roomId, callback) => {
            let user: any;
            user = await getUserbyName(roomId, userName);
            if (!user) {
                user = await getUser(socket.id);
            }
            if (user) {
                const userMessage = { type: 'user', user: user.users[0].name, text: message };
                await saveMessage(user.roomId, userMessage);
                io.to(user.name).emit('message', { ...userMessage });
                callback({ status: 'ok' })
            }
        })
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
    return httpServer;
}

