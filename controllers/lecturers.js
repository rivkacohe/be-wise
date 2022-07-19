var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "courses_catalog"
});

module.exports ={
   getLecturers:async function (req, res,next) { con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM lecturers", function (err, result, fields) {
      if (err) throw err;
      res.set('Access-Control-Allow-Origin','*');
      res.json(result);
      console.log(result);
    });
  })
   },


   getImage:async function(req,res){
    req.query
    fs.readFile( req.query, function(err, data) {
      if (err) throw err; // Fail if the file can't be read.
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data); // Send the file data to the browser.
    });
  },

getCourses: async function(req, res,next){con.connect(function(err){
  if (err) throw err;

  const query = `SELECT code, courses.name as 'name', courses.description, courses.price, courses.start_date,`+
  " courses.num_of_classes, categories.name 'category', lecturers.first_name , lecturers.last_name FROM `courses`"+
  "  LEFT JOIN categories ON categories.id =courses.category LEFT JOIN lecturers ON courses.lecturer_id = lecturers.id"
  con.query(query,function (err, result, fields) {
    if (err) throw err;
    res.set('Access-Control-Allow-Origin','*');
    res.json(result);
    console.log(result);
  })
})},

getCategories:async function (req, res,next) { con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM categories", function (err, result, fields) {
    if (err) throw err;
    res.set('Access-Control-Allow-Origin','*');
    res.json(result);
    console.log(result);
  });
})
 },

 getCoursesByCategories: async function(req, res,next){con.connect(function(err){
  if (err) throw err;

  const query = `SELECT code, courses.name as 'name', courses.description, courses.price, courses.start_date,`+
  " courses.num_of_classes, categories.name 'category', lecturers.first_name , lecturers.last_name FROM `courses`"+
  "  LEFT JOIN categories ON categories.id =courses.category LEFT JOIN lecturers ON courses.lecturer_id = lecturers.id"+
  ` WHERE categories.id=${req.query.id}`

  con.query(query,function (err, result, fields) {
    if (err) throw err;
    res.set('Access-Control-Allow-Origin','*');
    res.json(result);
    console.log(result);
  })
})},
}