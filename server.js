const io = require('socket.io')(3000, {
    cors: {origin: 'http://localhost:8080', credentials: false}
})

io.on('connection', socket => {
  console.log('có người kết nối này')
})