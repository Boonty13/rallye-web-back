const ResultModel = require('../../db/models/result')

async function recordResults(req, res) {

    const newResult = new ResultModel({
        team_id: req.body.team_id,
        stage: req.body.stage,
        position: req.body.position,
        gpe_position: req.body.gpe_position,
        time: req.body.time,
        diff: req.body.diff,
    })

    const resultSaved = await newResult.save()

    res.json({ data: resultSaved })
}

module.exports = recordResults