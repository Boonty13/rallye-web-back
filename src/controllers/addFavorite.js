const UserModel = require('../db/models/user');

async function addFavorite(req, res) {

  try {
    await UserModel.updateOne(
      {
        token: req.body.token
      }, {
      $push: { favorite: req.body.newValue }
    })
  } catch (error) {
    res.json({ result: false })
  }
  res.json({ result: true })
}

module.exports = addFavorite;