const socket = io()

// DOM Elements
let messages  = document.getElementById('messages')
let action    = document.getElementById('action')

let username  = document.getElementById('username')
let message   = document.getElementById('message')
let send      = document.getElementById('send')

send.addEventListener('click', () => {
  socket.emit('chat:client_message', {
    username: username.value,
    message:  message.value
  })
  console.log(username.value, message.value)
})

message.addEventListener('keypress', () => {
  socket.emit('chat:client_typing',{
    username: username.value
  })
  console.log(username.value)
})

socket.on('chat:server_message', data => {
  console.log(data)
  action.innerHTML = ``
  messages.innerHTML += `<p><strong>${data.username}: </strong>${data.message}</p>`
})

socket.on('chat:server_typing', data => {
  console.log(data)
  action.innerHTML = `<p><em>${data.username} is typing a message</em><p>`
})