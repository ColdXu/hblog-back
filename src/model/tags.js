var mongoose = require('../public/util/mongoose')

var dataSchema = mongoose.Schema({
    name: {
        unique: true,
        type: String,
    },
    count: Number,
});

module.exports = mongoose.model('tags', dataSchema);


