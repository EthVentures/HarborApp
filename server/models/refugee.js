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
  name: {
    type: String
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  profileImg: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  bmimages: {
    type: Array
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

module.exports = mongoose.model('Refugee', schema, 'refugees');
