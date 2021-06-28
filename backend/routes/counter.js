var express = require('express');
var router = express.Router();

const counterService = require('../services/counter');

let counter = 0;
/* GET home page. */
router.get('/', function(req, res, next) {
  counter++;
  return res.status(200).json({counter});
});

module.exports = router;
