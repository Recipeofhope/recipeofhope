var router = require('express').Router();
const { unapprovedCookList, approveCooks } = require('./admin');

router.get('/unapproved-cooks', function(req, res) {
  console.log('reached admin/ unapproved-cooks');
  return unapprovedCookList(req.decodedUser, res);
});

router.patch('/approve-cooks', function(req, res) {
  console.log('reached admin/ approve-cooks');
  return approveCooks(req.decodedUser, req.body, res);
});

module.exports = router;
