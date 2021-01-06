const socketio = require('socket.io');
const config = require('config');

// To avoid CORS policy
const ALLOWED_ORIGIN = config.get('allowedOrigin');

function createSocketServer(server) {
  const socketServer = socketio(server, {
    cors: {
      origin: ALLOWED_ORIGIN,
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

  socketServer.on('connection', function (socket) {
    console.log('New Connection');

    // Default room: Officiel 
    var myRoom = 'Officiel'
    socket.join(myRoom)

    // Listen if user is changing chat room
    socket.on('changeRoom', function (roomsInfo) {

      socket.leave('Officiel')
      socket.leave('Public')

      socket.join(roomsInfo.newRoom)
      myRoom = roomsInfo.newRoom
    })


    // Listen to message send to channel
    socket.on('messageToChannel', function (messageInfo) {
      socketServer.to(myRoom).emit('messageFromChannel', { messageInfo, room: myRoom })
    })
  })

  return socketServer;
}

module.exports = createSocketServer;
