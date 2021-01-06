const NewsModel = require('../../db/models/news')

async function recordNews(req, res) {

    const newNews = new NewsModel({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        dat: req.body.date,
    })

    const newsSaved = await newNews.save()

    res.json({ data: newsSaved })
}

module.exports = recordNews