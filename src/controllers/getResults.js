
const ResultModel = require('../db/models/result')

async function getResults(req, res) {

  const results = await ResultModel.find({ stage: 'ES1' })
    .populate({
      path: 'team_id',
      populate: {
        path: 'pilot_1',

      },
    })
    .populate({
      path: 'team_id',
      populate: {
        path: 'pilot_2'
      }
    })

    .sort({ position: 1 })
    .exec();

  res.json({ results })
}

module.exports = getResults