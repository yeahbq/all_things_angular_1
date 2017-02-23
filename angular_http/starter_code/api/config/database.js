var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/presidents-app');

module.exports = mongoose;
