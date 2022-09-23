const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')



const name = prompt('What will you like to be called?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} joined`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} left`)

})

messageForm.addEventListener('submit', e => {
  e.preventDefault()   //page doesn't refresh after sending,else we will loose our chat msgs
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message) // send info from client to server

  messageInput.value = ''  // clears out the text field after sending
})



function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
