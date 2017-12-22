var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jsonwebtoken = require('jsonwebtoken');
var CONFIG = require('../config.json');
var TOKEN_SECRET = CONFIG.token.secret;
var TOKEN_EXPIRES = parseInt(CONFIG.token.expiresInSeconds, 10);
var Image = require('../models/image');
var router = express.Router();
var tokenMiddleware = require('../middleware/token');
var rp = require('request-promise');

router.post('/addBiometrics', function(req, res){
  console.log("Add Payload Image");

  var image = new Image(req.body);
  var options = {
    method: 'POST',
    uri: 'http://localhost:5000/api/v1.0/image/save',
    body: {
      'image': req.body['image'],
      'filename':image['_id'] + '.jpeg'
    }, json: true
  };
  rp(options).then(function (parsedBody) {
      console.log(parsedBody);
      if (parsedBody.status == 200) {
        console.log("Saved Image");
        image.save(function (error) {
          res.json(image);
        });
      } else {
        console.log("Bad Image");
      }
  }).catch(function (err) {
      console.log(err);
  });

});

router.post('/deleteBiometrics', function(req, res){
  console.log("Delete Payload Image");

  var image = req.body;
  var options = {
    method: 'POST',
    uri: 'http://localhost:5000/api/v1.0/image/delete',
    body: {
      'filename':image['_id'] + '.jpeg'
    }, json: true
  };

  rp(options).then(function (parsedBody) {
      console.log(parsedBody);
      if (parsedBody.status == 200) {
        console.log("Delete Image");
        Image.remove({ _id: image['_id'] }, function(err) {
            if (!err) {
              res.json({deleted:true});
            } else { }
        });
      } else {
        console.log("Cannot delete image");
        res.json({deleted:false});
      }
  }).catch(function (err) {
      console.log(err);
  });

});

module.exports = router;
