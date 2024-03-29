const path = require('path')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
require('dotenv').config() 
const cors = require('cors')

app.use(express.static('public'))
app.use(express.json())
// app.use(express.urlencoded());
app.use(cors({
  origin: ['http://localhost:8080', 'https://tuanvipandpro.github.io'],
  credentials: true
}))

require('./routes')(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})

mongoose.connect('mongodb+srv://tuanlm:Ngugiduamay123@cluster0.ykqrm.mongodb.net/travel-app', {useNewUrlParser: true})
  .then(() => console.log('Connect DB successfully !!!'))
  .catch(e => console.error('Cannot connect DB !!!'))



server.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

let users = {}
let room = []

app.get('/online-user/', (req, res) => {
  res.status(200).json({status: 200, users})
})

app.get('/check-room/:id', (req, res) => {
  res.status(200).json({status: 200, result: room.includes(req.params.id)})
})

io.on('connect', socket => {
  console.log(`${socket.id} is connected !`)

  socket.on('join-room', data => {
    console.log(data)

    if (data.roomId) {
      room.push(data.roomId)

      socket.join(data.roomId)
      users[socket.id] = {
        name: data.clientName,
        roomId: data.roomId
      }
  
      socket.to(data.roomId).emit('new-user', data.clientName)
    }
  })

  socket.on('send-msg', data => socket.to(data.roomId).emit('new-msg', {clientName: data.clientNm, msg: data.msg}))

  socket.on('disconnect', data => {
    socket.leave(users[socket.id].roomId)
    socket.to(users[socket.id].roomId).emit('out-room', users[socket.id].name)
    delete users[socket.id]
  })
})
