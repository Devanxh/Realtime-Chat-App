const io = require('socket.io')(3000, { cors: { origin: "*" } } ); //specifying to not get anny cors errors

const users = {}

io.on('connection', socket => {

  socket.on('new-user', name => {
    users[socket.id] = name //key of {users}
    socket.broadcast.emit('user-connected', name)
  })

  socket.on('send-chat-message', message => {

    //broadcast will send this msg to every connection on server except for the sender
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })


  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
