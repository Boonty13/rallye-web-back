const ProgramModel = require('../../db/models/program')

async function recordProgram(req, res) {

    const newProgram = new ProgramModel({
        date: req.body.date,
        event: req.body.event,
    })

    const programSaved = await newProgram.save()

    res.json({ data: programSaved })
}

module.exports = recordProgram