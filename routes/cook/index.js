const { scheduleMeals, mealsReady, meals } = require('./cook');

var router = require('express').Router();

router.put('/schedule', function(req, res) {
  return scheduleMeals(req.decodedUser, req.body, res);
});

router.post('/meals-ready', function(req, res) {
  return mealsReady(req.decodedUser, res);
});

router.get('/meals', function(req, res) {
  return meals(req.decodedUser, res);
});

module.exports = router;
