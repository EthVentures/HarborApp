var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var schema = new Schema({
  id: {
    type: String,
    unique: true,
    default: shortid.generate
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String
  },
  gov: {
    type: String
  },
  website: {
    type: String
  },
  password: {
    type: String,
    required: true
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

module.exports = mongoose.model('User', schema, 'users');
