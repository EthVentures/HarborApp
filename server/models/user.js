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

// on every save, add the date
schema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updatedAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (! this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

module.exports = mongoose.model('User', schema, 'users');
