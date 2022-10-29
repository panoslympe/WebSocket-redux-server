const express = require('express');
const cors = require('cors');

const app = express();

const http = require('http');

const { Server } = require('socket.io');

app.use(cors);
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);
    socket.on("incoming_message", (data) => {
        console.log(data);
        socket.broadcast.emit("outgoing_message", data);
    })
});

server.listen(3001, () => { console.log("first server is running on port 3001") });