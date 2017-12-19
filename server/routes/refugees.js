var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jsonwebtoken = require('jsonwebtoken');
var CONFIG = require('../config.json');
var TOKEN_SECRET = CONFIG.token.secret;
var TOKEN_EXPIRES = parseInt(CONFIG.token.expiresInSeconds, 10);
var Refugee = require('../models/refugee');
var router = express.Router();
var tokenMiddleware = require('../middleware/token');

router.post('/refugeeCheck', tokenMiddleware.verifyToken, function(req, res){
  Refugee.findOne({ publicKey: req.body['refugee'] }, function handleQuery(error, ref) {
    console.log(ref);
    if (ref == null) {
      res.json({ found:false });
    } else {
      res.json({ found:true });
    }
  });
});

router.post('/refugeeSet', tokenMiddleware.verifyToken, function(req, res){
  console.log(req.body);
  var refugee = new Refugee({
    publicKey: req.body['refugee'].publicKey,
    publicEncKey: req.body['refugee'].publicEncKey,
    profileImg:req.body['refugee'].avatar.uri,
    location:req.body['refugee'].country,
    email:req.body['refugee'].email,
    name:req.body['refugee'].name,
    phone:req.body['refugee'].phone
  });
  console.log(refugee);
  refugee.save(function (error) {
    res.json({ success: true, refugee: refugee });
  });
});

module.exports = router;
