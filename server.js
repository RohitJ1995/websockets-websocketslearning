const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/formatMessage')
const { userJoin,
  getUser, getRoomusers, userLeave } = require('./utils/users')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = 3000
const botName = 'Bot'
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connection', socket => {

  socket.on('joinRoom', ({ username, room }) => {
    console.log(username, room)
    const user = userJoin(socket.id ,username, room )
    socket.join(user.room)
    // emit/broadcast to single client
    socket.emit('message', formatMessage(botName, `Welcome ${user.username}!!!`))

    // Broadcast when user connects (for all clients)
    socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(botName, `${user.username} has joined`))
    
    //Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id)
      if (user) {
        io.to(user.room).emit('message', formatMessage(botName, `${username} has left`))
      }
    })

    //listen for chatMessage
    socket.on('chatMessage', msg => {
      io.to(user.room).emit('message', formatMessage(msg.username, msg.text))
    })

    socket.on('typing', msg => {
      socket.broadcast
        .to(msg.room)
        .emit('typing', `${msg.username} is typing...`)
    })
    socket.on('typing_done', msg => {
      socket.broadcast
        .to(msg.room)
        .emit('typing_done', ``)
    })
  })
})

server.listen(port, () => { console.log(`Listening at port ${port}`) })