const {
  getMeals,
  bookMeals,
  cancelMeal,
  waitlistPatient,
} = require('./patient');

var router = require('express').Router();

router.get('/get-meals', function(req, res) {
  return getMeals(req.decodedUser, res);
});

router.put('/book-meals', function(req, res) {
  console.log('reached patient/book-meals');
  return bookMeals(req.decodedUser, req.body, res);
});

router.post('/cancel-meal', function(req, res) {
  return cancelMeal(req.decodedUser, req.body, res);
});

router.post('/waitlist', function(req, res) {
  return waitlistPatient(req.decodedUser, req.body, res);
});

module.exports = router;
