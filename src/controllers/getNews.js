const NewsModel = require('../db/models/news')

async function getNews(req, res) {
  const newsDb = await NewsModel.find()

  res.json({ news: newsDb })
}

module.exports = getNews
