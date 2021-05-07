const { createUser } = require('./user');

var router = require('express').Router();

router.get('/:id', function(req, res) {
  console.log('reached get user/:id with id: ' + req.params.id);
});

router.put('/:id', function(req, res) {
  console.log('reached put user/:id with id: ' + req.params.id);
});

router.delete('/:id', function(req, res) {
  console.log('reached delete user/:id with id: ' + req.params.id);
});

// Create a user.
router.post('/', async function(req, res) {
  return createUser(req.body, res);
});

module.exports = router;
