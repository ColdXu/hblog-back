var mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));
module.exports = mongoose;