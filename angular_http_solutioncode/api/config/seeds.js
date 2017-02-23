var mongoose = require('./database');

var President = require('../models/president');

var presidents = [
  {"name": "Blorp Florp McRichards", "start": 1789, "end": 1790},
  {"name": "John MuscleBrain Adams", "start": 1790, "end": 1801},
  {"name": "Blogpost Dorgabn", "start": 1801, "end": 1949},
  {"name": "Mike", "start": 1949, "end": 1947}
];

President.remove({}, function(err) {
  if (err) console.log(err);
  President.create(presidents, function(err, presidents) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + presidents.length  + " presidents.");
      mongoose.connection.close();
    }
    process.exit();
  });
});
