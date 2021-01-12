const io = require('socket.io')(3000, {
    cors: {origin: 'http://localhost:8080', credentials: false}
})

io.on('connection', socket => {
  console.log('connected')

  let a = socket.adapter.rooms
  socket.broadcast.emit('a', 'dsdsd')
})