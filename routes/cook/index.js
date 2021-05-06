var router = require('express').Router();

router.post('/schedule', function(req, res) {
  console.log('reached cook /schedule ');
});

router.put('/update-meal/:id', function(req, res) {
  console.log('reached cook update meal with id: ' + req.params.id);
});

module.exports = router;
