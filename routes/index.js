var express = require('express');
var router = express.Router();
var lm = require('../controllers/lecturers')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/lecturers', lm.getLecturers);
router.get('/courses', lm.getCourses);
router.get('/courses/filter', lm.getCoursesByCategories);
router.get('/categories', lm.getCategories);
router.get('/courses/export', lm.exportCourses);



module.exports = router;

