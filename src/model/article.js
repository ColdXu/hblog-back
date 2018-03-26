var mongoose = require('../public/util/mongoose')

var articleSchema = mongoose.Schema({
    title: String,
    content: String,
    createDate: Number,
    modifyDate: Number,
    publishDate: Number,
    lastPublishDate: Number,
    status: String,
    pv: 0
});

module.exports = mongoose.model('article', articleSchema);