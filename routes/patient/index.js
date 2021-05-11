const {
  cancelMeal
} = require('./patient');

const router = require('express').Router();

router.post('/book-meal', function(req, res) {
  console.log('reached patient /book-meal ');
});

router.put('/cancel-meal/:id', function(req, res) {
  console.log('reached patient /cancel-meal with id: ' + req.params.id);
  return cancelMeal(req.params.id, res);
});

module.exports = router;
