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
  hourly: {
    type: String
  },
  description: {
    type: String
  },
  jobr: {
    type: String
  },
  name: {
    type: String
  },
  position: {
    type: String
  },
  phone: {
    type: String
  },
  fax: {
    type: String
  },
  email: {
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

module.exports = mongoose.model('Job', schema, 'jobs');
