const io = require('socket.io')(3000, {
    cors: {origin: '*'}
})

let users = {}

io.on('connect', socket => {
  console.log(`${socket.id} is connected !`)

  socket.on('join-room', data => {
    socket.join(data.roomId)
    users[socket.id] = {
      name: data.clientName,
      roomId: data.roomId
    }

    socket.to(data.roomId).emit('new-user', data.clientName)
  })

  socket.on('send-msg', data => socket.to(data.roomId).emit('new-msg', {clientName: data.clientNm, msg: data.msg}))

  socket.on('disconnect', data => {
    socket.leave(users[socket.id].roomId)
    socket.to(users[socket.id].roomId).emit('out-room', users[socket.id].name)
    delete users[socket.id]
  })
})