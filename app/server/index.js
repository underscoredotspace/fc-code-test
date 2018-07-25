const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('dist/'))

io.on('connection', function(socket) {
  socket.on('chat', message => {})
})

http.listen(3000, () => {
  console.log('App running at http://localhost:3000')
})
