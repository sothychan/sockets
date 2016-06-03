'use strict';

const app = require('express')();
const server = app.listen(8080);
const Server = require('socket.io');

let io = new Server();
io.serveClient(false);
io.path('/socket');

io.listen(3000);


console.log('Express server listening on port 8080');
console.log('Socket server listening on port 3000');

app.get('/', () => {
    console.log('Server root');
});

setInterval(() => {
    console.log('Total number of users: ', Object.keys(io.of('/chatroom').connected).length);
}, 5000);

io.of('/chatroom')
    .on('connection', (socket) => {
        console.log('New client connected');
        socket.on('join', (data) => {
            console.log('Joining room: ', data);
            data = JSON.parse(data);
            socket.join(data.room);
        });

        socket.on('chat', (data) => {
            console.log('Chat received: ', data);
            data = JSON.parse(data);
            io.of('/chatroom').in(data.room).emit('chat', data);
        });

        socket.emit('connection-established');
    });

