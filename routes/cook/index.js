const { scheduleMeals } = require('./cook');

var router = require('express').Router();

router.put('/schedule', function(req, res) {
  console.log('reached cook /schedule ');
  return scheduleMeals(req.decodedUser, req.body, res);
});

router.put('/update-meal/:id', function(req, res) {
  console.log('reached cook update meal with id: ' + req.params.id);
});

module.exports = router;
