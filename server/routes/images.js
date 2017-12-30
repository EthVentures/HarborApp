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
var mongoose = require('mongoose');


router.get('/family/:id', function(req, res){
  Image.find({ publicKey: req.params.id }, function handleQuery(error, docs) {
    if (docs == null) {
      res.json({ success:false });
    } else {
      res.json({ success:true, members:docs });
    }
  });
});

router.post('/addBiometrics', function(req, res){
  console.log("Add Payload Image");

  var image = new Image(req.body);
  var options = {
    method: 'POST',
    uri: CONFIG.biometric.API_URL + CONFIG.biometric.SAVE_IMAGE_ROUTE,
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
    uri: CONFIG.biometric.API_URL + CONFIG.biometric.DELETE_IMAGE_ROUTE,
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

router.post('/findFamily', function(req, res){
  console.log("Find Family Images");

  var options = {
    method: 'POST',
    uri: CONFIG.biometric.API_URL + CONFIG.biometric.IDENTIFICATION_ROUTE,
    body: req.body, json: true
  };

  rp(options).then(function (resp) {
      console.log(JSON.stringify(resp));
      var predictions = resp.response[0].scores;
      var ids = [];
      var temp = {};
      for (var i = 0; i < predictions.length; i++) {
        var id = predictions[i].filename.split('.')[0];
        var result = predictions[i].result;
        if (result > 0.80) {
          if (mongoose.Types.ObjectId.isValid(id)) {
            ids.push(id);
            console.log(id);
            console.log(result);
            console.log(i);
            temp[id] = predictions[i];
          }
        }
      }
      Image.find({ '_id': { $in: ids } }, function(err, images){
        var im = {};
        var results = [];

        for (var i = 0; i < images.length; i++) {
          var nobj = JSON.parse(JSON.stringify(images[i]));
          im[nobj['_id']] = nobj;
        }

        for (var i = 0; i < predictions.length; i++) {
          var id = predictions[i].filename.split('.')[0];
          if (mongoose.Types.ObjectId.isValid(id)) {
            if (im[id] != null) {
              var nobj = im[id];
              console.log(JSON.stringify(predictions[i]));
              nobj['details'] = predictions[i];
              nobj['hasImg'] = false;
              results.push(nobj);
            }
          }
        }

        console.log("\n");
        console.log(JSON.stringify(results));
        res.json(results);
      });
  }).catch(function (err) {
      console.log(err);
  });

});



module.exports = router;
