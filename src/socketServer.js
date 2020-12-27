const socketio = require('socket.io');
const config = require('config');


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

        // Quand on arrive sur la page ChatScreen, par défault on est dans la room global (pilotes + admins)
        var myRoom = 'Officiel'
        socket.join(myRoom)
        console.log('JE SUIS DANS ROOM : ', myRoom)

        // Listen if user is changing chat room
        socket.on('changeRoom', function (roomsInfo) {

            socket.leave('Officiel')
            socket.leave('Public')

            socket.join(roomsInfo.newRoom)
            myRoom = roomsInfo.newRoom
            console.log('JE SUIS DANS ROOM : ', myRoom)
        })


        // Listen another event
        socket.on('messageToChannel', function (messageInfo) {
            console.log('in ROOM : ', messageInfo)
            socketServer.to(myRoom).emit('messageFromChannel', { messageInfo, room: myRoom })
        })


        // Room contenant tous les pilotes et admins (pour envoyer des messages globaux importants)
        // Room spécifique à une personne (comment faire pour le nom de la room ?) 
        // Récupérer les noms des 2 pilotes (le mien et le destinataire) pour faire le nom de la room ?
        // Plutot le num de l'équipe et si c'est pilote 1 ou 2
        // Room a destination des admins seulement (c'est possible ?)
        // Est ce qu'on fait des discussions par personne ou par team ? Par personne
        // Récupérer le numéro de l'équipe pour afficher avec le nom dans la liste déroulante pour choisir sa room
        // Enregistrer les messages en BDD ?
    })

    return socketServer;
}

module.exports = createSocketServer;


// var io=require('socket.io')(server);
// io.on('connection', function(socket){
//   console.log('a user is connected')

//   // Listen an event
//   socket.on('sendMessage', function(message){
//     console.log(message)
//     io.emit('sendMessageToAll', message)
//   })

//   socket.on('sendPosition', function(position){
//     console.log(position)
//     socket.broadcast.emit('receivePosition', position)
//   })
// })