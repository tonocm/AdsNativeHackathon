var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET catalog. */
router.get('/catalog', function(req, res, next) {
  res.render('catalog', { title: 'Express' });
});

/* GET add game. */
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Express' });
});

/* GET about. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

/* GET login. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
