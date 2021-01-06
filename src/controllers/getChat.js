const ChatModel = require('../db/models/chat');

async function getChat(req, res) {
  const answerDb = await ChatModel.findOne({ roomName: req.query.room })

  res.json({ roomInfo: answerDb })
}

module.exports = getChat;