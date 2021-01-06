const UserModel = require('../db/models/user')

async function removeFavorite(req, res) {
  try {
    await UserModel.updateOne(
      {
        token: req.body.token
      }, {
      $pull: { favorite: req.body.valueToRemove }
    })
  } catch (error) {
    res.json({ result: false })
  }
  res.json({ result: true })
}

module.exports = removeFavorite