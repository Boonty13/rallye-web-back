const UserModel = require('../db/models/user')
var encBase64 = require("crypto-js/enc-base64")
const uid2 = require('uid2')
const SHA256 = require("crypto-js/sha256")

async function updatePassword(req, res) {

  let result = false
  const salt = uid2(32);

  var update = {
    salt: salt,
    password: SHA256(req.body.newValue + salt).toString(encBase64)
  }

  const updateDb = await UserModel.updateOne(
    {
      token: req.body.token
    }, update
  )

  if (updateDb.nModified === 1) {
    result = true
  }

  // Retrieve user updated
  const answerDb = await UserModel.findOne({ token: req.body.token });

  res.json({ result, user: answerDb })
}

module.exports = updatePassword;