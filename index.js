const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('New user connected');
  
    socket.on('chatMessage', (data) => {
      io.emit('message', data);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

