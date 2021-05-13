const { getMeals } = require('./patient');

var router = require('express').Router();

router.get('/get-meals', function(req, res) {
  console.log('reached patient/get-meal ');
  return getMeals(req.decodedUser, res);
});

router.post('/book-meal', function(req, res) {
  console.log('reached patient /book-meal ');
});

router.post('/cancel-meal/:id', function(req, res) {
  console.log('reached patient /cancel-meal with id: ' + req.params.id);
});

module.exports = router;

