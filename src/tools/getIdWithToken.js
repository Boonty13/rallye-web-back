//// A function that take the token of an user and return is id ////

const UserModel = require('../db/models/user')

async function getIdWithToken(token) {

  const user = await UserModel.findOne({ token: token })
  return user._id
}

module.exports = getIdWithToken