const { cancelMeals } = require('./patient')
var router = require('express').Router();

// eslint-disable-next-line no-unused-vars
router.post('/book-meal', function(req, res) {
  console.log('reached patient /book-meal ');
});

router.post('/cancel-meal/:id', function(req, res) {
  console.log('reached patient /cancel-meal with id: ' + req.params.id);
  return cancelMeals(req.params.id, req.body, req.decodedUser, res);
});

module.exports = router;
