'use strict';

const io = require('socket.io-client');

const client1 = io('http://localhost/chatroom', { path: '/socket' });

client1.on('connect', () => {
    console.log('Client1 connected properly');
});

client1.on('connect_error', (err) => {
    console.log('Client1 connect error: ', err);
});

client1.on('connection-established', () => {
    console.log('Client1 Connection established.  Emit join');
    client1.emit('join', JSON.stringify({
        room: 'room1',
        user: 'user1'
    }));
});

client1.on('chat', (data) => {
    console.log(`Client1 received chat from ${data.user} with message ${data.message}`);
});

const client2 = io('http://localhost/chatroom', { path: '/socket' });

client2.on('connect', () => {
    console.log('Client2 connected properly');
})

client2.on('connect_error', (err) => {
    console.log('Client2 connect error: ', err);
});

client2.on('chat', (data) => {
    console.log(`Client2 received chat from ${data.user} with message ${data.message}`);
});

client2.on('connection-established', () => {
    console.log('Client2 connection established.  Emit join');
    client2.emit('join', JSON.stringify({
        room: 'room1',
        user: 'user2'
    }));
});

const client3 = io('http://localhost/chatroom', { path: '/socket' });

client3.on('connect', () => {
    console.log('Client3 connected properly');
})

client3.on('connect_error', (err) => {
    console.log('Client3 connect error: ', err);
});

client3.on('chat', (data) => {
    console.log(`Client3 received chat from ${data.user} with message ${data.message}`);
});

client3.on('connection-established', () => {
    console.log('Client3 connection established.  Emit join');
    client3.emit('join', JSON.stringify({
        room: 'room2',
        user: 'user3'
    }));
});

setTimeout(() => {
    client2.emit('chat', JSON.stringify({
        room: 'room1',
        user: 'user2',
        message: 'hello'
    }));
}, 2000);