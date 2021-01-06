const ChatModel = require('../../db/models/chat')

async function recordChat(req, res) {

  // Generate automatic message to validate the new room
    let chat = {
        msg:'Welcome to this new room',
        sender:'Automatic',
        status:'Admin'
    }

    const newChat = new ChatModel({
        roomName: req.body.room,
        members: req.body.members,
        history: chat
    })

    const ChatSaved = await newChat.save()

    res.json({ data: ChatSaved })
}

module.exports = recordChat