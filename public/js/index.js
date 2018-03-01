var socket = io();

socket.on('connect', () =>{
  console.log('New connection from browser');

  socket.emit('createMessage', {
    from: "mahfuz",
    text: "This is index.js"
  })
});

socket.on('newMessage', function(message) {
  console.log("New Message ", message);
});

socket.on('disconnect', () =>{
  console.log('Disconnect server from browser');
});
