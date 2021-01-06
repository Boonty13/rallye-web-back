const ChatModel = require('../db/models/chat')

async function updateChat(req, res) {

  try {
    await ChatModel.updateOne(
      {
        roomName: req.body.room
      }, {
      $push: { history: JSON.parse(req.body.newMsg) }
    })
  } catch (error) {
    res.json({ result: false })
  }
  res.json({ result: true })
}

module.exports = updateChat