const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connection', socket => {
	console.log('New web socket')

	// emit/broadcast to single client
	socket.emit('message', 'Welcome to chartcord!!!')

	// Broadcast when user connects (for all clients)
	socket.broadcast.emit('message', `User has joined`)

	//Runs when client disconnects
	socket.on('disconnect', () => {
		io.emit('message', `A user has left`)
	})

	//listen fro chatMessage
	socket.on('chatMessage', msg => {
		io.emit('message', msg)
		console.log(msg)
	})

})

server.listen(port, () => { console.log(`Listening at port ${port}`) })