var express = require('express');
const { addStudent } = require('../controllers/lecturers');
var router = express.Router();
var lm = require('../controllers/lecturers');
var cm = require('../controllers/courses');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/lecturers', lm.getLecturers);
router.get('/courses', cm.getCourses);
router.get('/courses/filter', cm.getFilterdCourses);
router.get('/categories', cm.getCategories);
router.get('/courses/export', cm.exportCourses);
router.post('/courses/register', cm.addStudent);


module.exports = router;

