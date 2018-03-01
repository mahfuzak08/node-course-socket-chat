const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const jade = require('jade');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('New connection start');

  socket.on('disconnect', () =>{
    console.log('Disconnect from server');
  })
});

server.listen(port, () =>{
  console.log(`Server is up in ${port} port`);
});
