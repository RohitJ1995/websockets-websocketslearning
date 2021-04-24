const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/formatMessage')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = 3000
const botName = 'Bot'
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connection', socket => {

	// emit/broadcast to single client
  socket.emit('message', formatMessage(botName, 'Welcome to chartcord!!!'))

	// Broadcast when user connects (for all clients)
  socket.broadcast.emit('message', formatMessage(botName, `User has joined`))

	//Runs when client disconnects
	socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, `A user has left`))
	})

	//listen for chatMessage
	socket.on('chatMessage', msg => {
    io.emit('message', formatMessage(msg.username, msg.text))
	})

})

server.listen(port, () => { console.log(`Listening at port ${port}`) })