const CarModel = require('../../db/models/car')

async function recordCar(req, res) {

    const newCar = new CarModel({
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        image: req.body.image,
        description: req.body.description
    })

    const carSaved = await newCar.save();

    res.json({ data: carSaved })
}

module.exports = recordCar