import express from 'express';
import { router as chatRouter } from './router/chat';
import cors from "cors";
import { roomRouter } from './router/room';
import compression from 'compression';
import { initialize } from './socket/socket';

const app = express();

// Middlewares
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(compression());

// Routes
app.use(chatRouter);
app.use(roomRouter);


app.use(cors());

require('./db/mongoose');

const PORT = process.env.PORT || 5000;

// init socket
const httpServer = initialize(app);


httpServer.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
});