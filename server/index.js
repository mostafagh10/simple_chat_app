const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// return static files (view)
app.use(express.static(path.join('../ui')));

// run when client connect to the server
io.on('connection',socket => {
    console.log("new connection ");
    socket.emit("message" , formatMessage('chat bot',"hello in chat application")); //emit only the single user who connects
    socket.broadcast.emit("message", formatMessage('chat bot',"there's user has joined the chat")); // emit all users except the user who connects

    //emit all users expect leaving user when user disconnect
    socket.on("disconnect",() => {
        io.emit("message",formatMessage('chat bot',"there's user left the chat"))
    })

    //receive message from main.js
    socket.on("chatMsg",(user, msg) => {
        console.log(msg);
        io.emit("message",formatMessage(user,msg));
    })

})

const PORT = 3000 || process.env.PORT;

server.listen(PORT , () => {
    console.log(`the server running on port ${PORT}`);
})