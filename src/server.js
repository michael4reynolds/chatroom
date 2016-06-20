import socket_io from 'socket.io'
import http from 'http'
import express from 'express'
import * as path from 'path'

const app = express()
app.use(express.static(path.join(__dirname, '../public')))

const server = http.createServer(app)
const io = socket_io(server)

io.on('connection', socket => {
  console.log('Client connected')

  socket.on('message', message => {
    console.log('Received message', message)
    socket.broadcast.emit('message', message)
  })
})

server.listen(8000)
