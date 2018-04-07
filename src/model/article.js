var mongoose = require('../public/util/mongoose')

var articleSchema = mongoose.Schema({
    title: String,
    content: String,
    coverId: String,
    createDate: Number,
    modifyDate: Number,
    publishDate: Number,
    lastPublishDate: Number,
    tagId: String,
    tagName: String,
    status: String,
    pv: 0
});

module.exports = mongoose.model('article', articleSchema);