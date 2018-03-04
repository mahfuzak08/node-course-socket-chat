const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
// const jade = require('jade');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var localUsers = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('New connection start');
  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and room not valid');
    }

    socket.join(params.room);
    localUsers.removeUser(params.id);
    localUsers.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', localUsers.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));
    callback();
  });

  socket.on('createMessage', (message, callback) =>{
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) =>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () =>{
    var user = localUsers.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', localUsers.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  })
});

server.listen(port, () =>{
  console.log(`Server is up in ${port} port`);
});
