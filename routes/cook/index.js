const { scheduleMeals, mealsReady } = require('./cook');

var router = require('express').Router();

router.put('/schedule', function(req, res) {
  return scheduleMeals(req.decodedUser, req.body, res);
});

router.post('/meals-ready', function(req, res) {
  return mealsReady(req.decodedUser, res);
});

module.exports = router;
