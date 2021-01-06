const UserModel = require('../db/models/user')

async function getUser(req, res) {
  const answerDb = await UserModel.findOne({ token: req.query.token })
    .populate('favorite')
    .exec()

  res.json({ user: answerDb })
}

module.exports = getUser