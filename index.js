const express = require('express')
const app = express()
const path = require('path')
const socket_io = require('socket.io')

// Settings
app.set('port', process.env.PORT || 3000)

// Static Files
app.use(express.static(path.join(__dirname,'public')))

const server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})

const io = socket_io(server)
// Websockets
io.on('connection', (socket) => {
  console.log('New connection:',socket.id)

  socket.on('chat:client_message', data => {
    console.log(data)
    io.sockets.emit('chat:server_message', data)
  })

  socket.on('chat:client_typing', username => {
    console.log(username)
    socket.broadcast.emit('chat:server_typing', username)
  })
})
