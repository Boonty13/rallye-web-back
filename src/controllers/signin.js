const UserModel = require('../db/models/user')
const SHA256 = require("crypto-js/sha256")
const encBase64 = require("crypto-js/enc-base64")
const Joi = require('joi')

const schemaPayload = Joi.object({

  password: Joi.string()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
})

async function signIn(req, res) {

  let result = false;
  let user = null;
  const errorArray = [];

  const answer = {
    token: null,
    status: null
  }

  ////// Validation payload //////

  const { error } = schemaPayload.validate(req.body,
    { abortEarly: false });

  console.log('ERREURS', error);

  if (error !== undefined) {
    const answerJoi = error.details;

    answerJoi.forEach(element => {
      errorArray.push(element.message)
    });
  }

  ///// Process if payload ok /////

  if (errorArray.length == 0) {

    user = await UserModel.findOne({ email: req.body.email })
      .populate('favorite')
      .exec();

    if (user) {
      var hash = SHA256(req.body.password + user.salt).toString(encBase64);

      ///// Testing password /////

      if (hash === user.password) {
        result = true;
        answer.token = user.token;
        answer.status = user.status;
        answer.firstname = user.firstname;
        answer.name = user.name;
        answer.email = user.email;
        answer.avatar = user.avatar;
        answer.nationality = user.nationality;
        answer.favorites = user.favorite
      } else {
        errorArray.push('wrong password')
      }

    } else {
      errorArray.push("inexisting email")
    }
  }
  res.json({ result, data: answer, error: errorArray })
}

module.exports = signIn