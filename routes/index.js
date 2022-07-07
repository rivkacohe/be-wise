var express = require('express');
var router = express.Router();
var lm = require('../controllers/lecturers')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/lecturers', lm.getLecturers);

module.exports = router;

