var router = require('express').Router();
const { unapprovedCookList, approveCooks, getWaitlist } = require('./admin');

router.get('/unapproved-cooks', function(req, res) {
  return unapprovedCookList(req.decodedUser, res);
});

router.get('/waitlist', function(req, res) {
  return getWaitlist(req.decodedUser, res);
});

router.patch('/approve-cooks', function(req, res) {
  return approveCooks(req.decodedUser, req.body, res);
});

module.exports = router;
