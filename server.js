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

	socket.emit('message', 'Welcome to chartcord!!!')
})

server.listen(port, () => { console.log(`Listening at port ${port}`) })