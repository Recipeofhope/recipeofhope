var router = require('express').Router();

router.post('/book-meal', function(req, res) {
  console.log('reached patient /book-meal ');
});

router.post('/cancel-meal/:id', function(req, res) {
  console.log('reached patient /cancel-meal with id: ' + req.params.id);
});

module.exports = router;
