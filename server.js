const io = require('socket.io')(3000, {
    cors: {origin: 'http://localhost:8080', credentials: false}
})

let users = {}

io.on('connect', socket => {
  console.log('connected')

  socket.on('join-room', data => {
    socket.join(data.roomId)
    users[socket.id] = data.clientName
    console.log(data.roomId)
  })

  socket.on('disconnect', data => {
    socket.leave(data.roomId)
    socket.to(data.roomId).emit('out-room', users[socket.id])
  })
})