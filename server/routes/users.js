var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jsonwebtoken = require('jsonwebtoken');
var CONFIG = require('../config.json');
var TOKEN_SECRET = CONFIG.token.secret;
var TOKEN_EXPIRES = parseInt(CONFIG.token.expiresInSeconds, 10);
var User = require('../models/user');
var router = express.Router();
var tokenMiddleware = require('../middleware/token');

router.post('/authping', tokenMiddleware.verifyToken, function(req, res){
  res.json({
    status:true, message: "This account is auth on the Harbor network"
  });
});

router.post('/register', function createUser(request, response) {
  User.findOne({ username: request.body.username }, function handleQuery(error, user) {
    if (error) {
      response.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }
    if (user) {
      response.status(409).json({ success: false, message: 'Username \'' + request.body.username + '\' already exists.' });
      return;
    }
    bcrypt.genSalt(10, function (error, salt) {
      if (error) {
        response.status(500).json({ success: false, message: 'Internal server error' });
        throw error;
      }
      bcrypt.hash(request.body.password, salt,null, function (error, hash) {
        if (error) { response.status(500).json({ success: false, message: 'Internal server error' });
          throw error;
        }
        var user = new User({
          username: request.body.username,
          password: hash,
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          email: request.body.email,
          gov:request.body.gov,
          website: request.body.website
        });
        user.save(function (error) {
          if (error) {
            response.status(500).json({ success: false, message: 'Internal server error' });
            throw error;
          }
          response.json({ success: true, user: { username:user.username, firstName:user.firstName, lastName:user.lastName, id:user.id, email:user.email } });
        });
      });
    });
  });
});

router.post('/authenticate', function authenticateUser(request, response) {
  User.findOne({ username: request.body.username }, function handleQuery(error, user) {
    if (error) {
      response.status(500).json({ success: false, message: 'Internal server error' });
      throw error;
    }
    if (!user) {
      response.status(401).json({ success: false, message: 'Authentication Failed.' });
      return;
    }
    bcrypt.compare(request.body.password, user.password, function (error, result) {
      if (error) {
        response.status(500).json({ success: false, message: 'Internal server error' });
        throw error;
      }
      if (!result) {
        response.status(401).json({ success: false, message: 'Authentication failed.'
        });
        return;
      }
      var token = jsonwebtoken.sign({ username: user.username }, TOKEN_SECRET, {
        expiresIn: TOKEN_EXPIRES
      });
      response.json({ success: true, token: token, user: { username:user.username, firstName:user.firstName, lastName:user.lastName, id:user.id, email:user.email } });
    });
  });
});

module.exports = router;
