var mongoose = require('../public/util/mongoose')

var dataSchema = mongoose.Schema({
    filename: String,
    base64: String,
    file: Number,
});

module.exports = mongoose.model('article', dataSchema);


