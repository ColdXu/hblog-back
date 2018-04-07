var mongoose = require('../public/util/mongoose')

var dataSchema = mongoose.Schema({
    filename: String,
    path: String,
    createDate: Number,
    mediaType: String,
    type: String,
});

module.exports = mongoose.model('media', dataSchema);


