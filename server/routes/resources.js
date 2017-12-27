var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jsonwebtoken = require('jsonwebtoken');
var CONFIG = require('../config.json');
var TOKEN_SECRET = CONFIG.token.secret;
var TOKEN_EXPIRES = parseInt(CONFIG.token.expiresInSeconds, 10);
var Job = require('../models/job');
var Skill = require('../models/skill');
var router = express.Router();
var tokenMiddleware = require('../middleware/token');
var rp = require('request-promise');

router.post('/job', function(req, res){
  var job = new Job(req.body);
  console.log(job);
  job.save(function (error) {
    res.json({ success: true, refugee: job });
  });
});

router.get('/job', function(req, res){
  Job.find({}, function handleQuery(error, jobs) {
    console.log(jobs);
    if (jobs == null) {
      res.json({ success:false });
    } else {
      res.json({ success:true, jobs:jobs });
    }
  });
});

router.put('/job', function(req, res){
  Job.findById(req.body['_id'], function(err, job) {
    if (err) { res.send(err); }

    job.title = req.body.title
    job.location = req.body.location
    job.hourly = req.body.hourly
    job.description = req.body.description
    job.jobr = req.body.jobr
    job.name = req.body.name
    job.position = req.body.position
    job.phone = req.body.phone
    job.fax = req.body.fax
    job.email = req.body.email

    job.save(function(err) {
      if (err) { res.send(err); }
      res.json({ success:true, job:job });
    });

  });
});

router.delete('/job/:id', function(req, res){
  Job.findById(req.params.id, function (err, doc) {
    if (err) {
      res.json({success:false});
    }
    doc.remove(function (err) {
      if (err) throw err;
      res.json({success:true});
    });
  });
});

router.post('/skill', function(req, res){
  var skill = new Skill(req.body);
  console.log(skill);
  skill.save(function (error) {
    res.json({ success: true, skill: skill });
  });
});

router.get('/skill/:id', function(req, res){
  Skill.find({'ref':req.params.id}, function handleQuery(error, skills) {
    console.log(skills);
    if (skills == null) {
      res.json({ success:false });
    } else {
      res.json({ success:true, skills:skills });
    }
  });
});

router.put('/skill', function(req, res){
  Skill.findById(req.body['_id'], function(err, skill) {
    if (err) { res.send(err); }

    skill.title = req.body.title
    skill.location = req.body.location
    skill.description = req.body.description
    skill.start = req.body.start
    skill.end = req.body.end
    skill.ref = req.body.ref

    skill.save(function(err) {
      if (err) { res.send(err); }
      res.json({ success:true, skill:skill });
    });

  });
});

router.delete('/skill/:id', function(req, res){
  Skill.findById(req.params.id, function (err, doc) {
    if (err) {
      res.json({success:false});
    }
    doc.remove(function (err) {
      if (err) throw err;
      res.json({success:true});
    });
  });
});

module.exports = router;
