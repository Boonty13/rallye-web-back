
const ResultModel = require('../db/models/result');

async function getResults(req, res) {

    const results = await ResultModel.find()
        .populate('team_id')
        .sort({ position: 1 })
        .exec();
    console.log(results);

    res.json({ results: results })
}

module.exports = getResults;