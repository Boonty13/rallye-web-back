const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    title: String,
    image: String,
    description: String,
    articletxt: String,
    date: Date,
})

const newsModel = mongoose.model('news', newsSchema);

module.exports = newsModel;