var express = require('express');
var router = express.Router();
var dao = require('../dao/dao');
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", function (req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
  res.send("login success");
});

router.get("/mongo", async function (req, res) {
  try {
    await dao.mongooseConnect();
  } catch (error) {
    console.log(error)
  }
  res.send("connected");
});

module.exports = router;
