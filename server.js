const io = require('socket.io')(3000, {
    cors: {origin: '*'}
})

let users = {}

io.on('connect', socket => {
  console.log('connected')

  socket.on('join-room', data => {
    socket.join(data.roomId)
    users[socket.id] = data.clientName

    socket.to(data.roomId).emit('new-user', data.clientName)
    console.log(data.roomId)
  })

  socket.on('send-msg', data => socket.to(data.roomId).emit('new-msg', {clientName: data.clientNm, msg: data.msg}))

  socket.on('disconnect', data => {
    console.log(data)
    // socket.leave(data.roomId)
    // socket.to(data.roomId).emit('out-room', users[socket.id])
    // delete users[socket.id]
  })
})