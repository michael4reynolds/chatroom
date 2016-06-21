import socket_io from 'socket.io'
import http from 'http'
import express from 'express'
import path from 'path'

const app = express()
app.use(express.static(path.join(__dirname, '../public')))

const server = http.createServer(app)
const io = socket_io(server)

const connections = []
const  users = []

io.on('connection', socket => {
  connections.push(socket)
  socket.broadcast.emit('new conn', `Connections: ${connections.length} sockets connected`)

  socket.on('disconnect', () => {
    users.splice(users.indexOf(socket.username))
    io.emit('get users', users)
    connections.splice(connections.indexOf(socket), 1)
    socket.broadcast.emit('disconnect conn', `Connections: ${connections.length} sockets connected`)
  })

  socket.on('send message', message => {
    console.log('Received message', message)
    socket.broadcast.emit('message', {msg: message, user: socket.username})
  })

  socket.on('new user', (nickname, callback) => {
    callback(true)
    socket.username = nickname
    users.push(socket.username)
    io.emit('get users', users)
  })
})

server.listen(process.env.PORT || 8000)
console.log('Server is running')
