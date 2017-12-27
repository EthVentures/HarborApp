var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var schema = new Schema({
  title: {
    type: String
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  ref: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

schema.pre('save', function (next) {
  var currentDate = new Date();
  this.updatedAt = currentDate;
  if (! this.createdAt) {
    this.createdAt = currentDate;
  }
  next();
});

module.exports = mongoose.model('Skill', schema, 'skills');
