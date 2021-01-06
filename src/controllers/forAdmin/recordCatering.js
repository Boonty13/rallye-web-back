const CateringModel = require('../../db/models/catering')

async function recordCatering(req, res) {

    const newCatering = new CateringModel({
        adress: req.body.adress,
        date: req.body.date
    })

    const cateringSaved = await newCatering.save()

    res.json({  data: cateringSaved })
}

module.exports = recordCatering