var mongoose = require('../public/util/mongoose')

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    headImg: String,
    createDate: String,
    rule: Array
});

//  与users集合关联
module.exports = mongoose.model('user', userSchema);


