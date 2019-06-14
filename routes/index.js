var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET Common api test Page. */
router.get('/common', function (req, res, next) {
  res.render('common', { title: 'Common' });
});
module.exports = router;
