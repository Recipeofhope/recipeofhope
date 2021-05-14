
const { 
  getMeals,
  bookMeals 
} = require('./patient');

var router = require('express').Router();

router.get('/get-meals', function(req, res) {
  return getMeals(req.decodedUser, res);
});

router.put('/book-meals', function(req, res) {
  console.log('reached patient/book-meals');
  return bookMeals(req.decodedUser, req.body, res)

});

router.post('/cancel-meal/:id', function(req, res) {
  console.log('reached patient/cancel-meal with id: ' + req.params.id);
});

module.exports = router;

