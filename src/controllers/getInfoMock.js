const mongoose = require('mongoose');

const AccomodationModel = require('../db/models/accomodation');
const CateringModel = require('../db/models/catering');

const getIdWithToken = require('../tools/getIdWithToken');

//////// This controller return accomodation depending of the day of the week to avoid to repopulate db /////////

async function getInfoMock(req, res) {

    console.log('QUERY', req.query);

    const idUser = await getIdWithToken(req.query.token);
    const today = new Date;

    const returnDay = () => {
        switch (today.getDay()) {
            case 1:
                return 14;
            case 2:
                return 15;
            case 3:
                return 16;
            case 4:
                return 17;
            default:
                return 18;
        }
    }

    //// Getting the accomodation of the day for the user connected (with is token) /////
    const accomodation = await AccomodationModel
        .aggregate()
        .match({ users: mongoose.Types.ObjectId(idUser) })
        .addFields({ "month": { $month: '$date' }, "day": { $dayOfMonth: '$date' }, "year": { $year: '$date' } })
        .match({ day: returnDay() }, { month: 12 }, { year: 2020 })
        .exec()


    //// Getting the catering of the day  /////
    const catering = await CateringModel
        .aggregate()

        .addFields({ "month": { $month: '$date' }, "day": { $dayOfMonth: '$date' }, "year": { $year: '$date' } })
        .match({ day: returnDay() }, { month: 12 }, { year: 2020 })
        .exec()


    res.json({ accomodation, catering })
}

module.exports = getInfoMock;