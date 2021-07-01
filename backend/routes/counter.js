const express = require('express');
const router = express.Router();

const counterService = require('../services/counter');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const count = await counterService.update(req.sessionID);
  return res.status(200).json({counter: count});
});

module.exports = router;
