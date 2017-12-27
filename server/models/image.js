var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var schema = new Schema({
  publicKey: {
    type: String
  },
  publicEncKey: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  notes: {
    type: String
  },
  age: {
    type: String
  },
  user: {
    type: Object
  },
  location: {
    type: String
  },
  relationship: {
    type: String
  },
  missing: {
    type: Boolean
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

module.exports = mongoose.model('Image', schema, 'images');
