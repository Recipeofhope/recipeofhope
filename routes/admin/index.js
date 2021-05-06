var router = require('express').Router();

router.get('/users', function(req, res) {
  console.log('reached admin /users');
});

router.put('/approve-user/:id', function(req, res) {
  console.log('reached /approve-user with id: ' + req.params.id);
});

module.exports = router;
