var mongoose = require('mongoose');

var PresidentSchema = mongoose.Schema({
	name: String,
  start: Number,
	end: Number,
  uncovered: { type: Boolean, default: false }
});

module.exports = mongoose.model('President', PresidentSchema);
