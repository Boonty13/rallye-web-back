const mongoose = require('mongoose');

const AccomodationModel = require('../db/models/accomodation');
const CateringModel = require('../db/models/catering');

const getIdWithToken = require('../tools/getIdWithToken');

async function getInfo(req, res) {

  const idUser = await getIdWithToken(req.query.token);
  const today = new Date;

  //// Getting the accomodation of the day for the user connected (with is token) /////
  const accomodation = await AccomodationModel
    .aggregate()
    .match({ users: mongoose.Types.ObjectId(idUser) })

    .addFields({ "month": { $month: '$date' }, "day": { $dayOfMonth: '$date' }, "year": { $year: '$date' } })
    .match({ day: today.getDate() }, { month: (today.getMonth() + 1) }, { year: today.getFullYear() })

    .exec()

  //// Getting the catering of the day  /////
  const catering = await CateringModel
    .aggregate()

    .addFields({ "month": { $month: '$date' }, "day": { $dayOfMonth: '$date' }, "year": { $year: '$date' } })
    .match({ day: today.getDate() }, { month: (today.getMonth() + 1) }, { year: today.getFullYear() })

    .exec()

  res.json({ accomodation, catering })
}

module.exports = getInfo;