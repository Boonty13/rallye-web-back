const TeamModel = require('../../db/models/team')

async function recordTeam(req, res) {

    const newTeam = new TeamModel({
        pilot_1: req.body.pilot_1,
        pilot_2: req.body.pilot_2,
        car_id: req.body.car_id,
        car: req.body.car,
        category: req.body.category,
        grid: req.body.grid
    })

    const teamSaved = await newTeam.save()

    res.json({ data: teamSaved })
}

module.exports = recordTeam