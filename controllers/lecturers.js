const joi = require('joi');
const fileMgmt = require('../shared/fileMgmt')
const database = require('./database');


module.exports = {


  getLecturers: async function (req, res, next) {

    try {
      const result = await database.query("SELECT * FROM lecturers")
      res.json(result[0]);

    }
    catch (err) {
      console.log(err);
      res.json(err);
    }

  },


  getImage: async function (req, res) {

    fs.readFile(req.query, function (err, data) {
      if (err) throw err; // Fail if the file can't be read.
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data); // Send the file data to the browser.
    });
  },

  getCourses: async function (req, res, next) {
  
      const param = req.query;

      const schema = joi.object({
        column: joi.string().valid('name', 'price').default('name'),
        sort: joi.string().valid('ASC', 'DESC').default('ASC'),
      });

      const { error, value } = schema.validate(param);
      if (error) {
        console.log(error);
        res.status(400).send('add failed');
        return
      }

      const fieldsMap = new Map([
        ['name', 'courses.name'],
        ['price', 'courses.price'],
      ]);

      const query = `SELECT code, courses.name as 'name', courses.description, courses.price, courses.start_date,` +
        " courses.num_of_classes, categories.name 'category', lecturers.first_name , lecturers.last_name FROM `courses`" +
        "  LEFT JOIN categories ON categories.id =courses.category LEFT JOIN lecturers ON courses.lecturer_id = lecturers.id" +
        ` ORDER BY ${fieldsMap.get(value.column)} ${value.sort}`
        
      try {
        const result =  await database.query(query);
        res.json(result[0]);  
      }
      catch (err) {
        console.log(err);
        res.json(err);
      }
  },

  getCategories: async function (req, res, next) {
   
        try {
          const result =  await database.query("SELECT * FROM categories");
          res.json(result[0]);    
        }
        catch (err) {
          console.log(err);
          res.json(err);
        }
  },

  getCoursesByCategories: async function (req, res, next) {
   

      const query = `SELECT code, courses.name as 'name', courses.description, courses.price, courses.start_date,` +
        " courses.num_of_classes, categories.name 'category', lecturers.first_name , lecturers.last_name FROM `courses`" +
        "  LEFT JOIN categories ON categories.id =courses.category LEFT JOIN lecturers ON courses.lecturer_id = lecturers.id" +
        ` WHERE categories.id=${req.query.id}`

        try {
          const result =  await database.query(query);
          res.json(result[0]);
    
        }
        catch (err) {
          console.log(err);
          res.json(err);
        }
 
  },

  exportCourses: async function (req, res, next) {
      let query;
   

      if (!req.query.id) {
        query = `SELECT code, courses.name as 'name', courses.description, courses.price, courses.start_date,` +
          " courses.num_of_classes, categories.name 'category', lecturers.first_name , lecturers.last_name FROM `courses`" +
          "  LEFT JOIN categories ON categories.id =courses.category LEFT JOIN lecturers ON courses.lecturer_id = lecturers.id"
      }

      else {
        query = `SELECT code, courses.name as 'name', courses.description, courses.price, courses.start_date,` +
          " courses.num_of_classes, categories.name 'category', lecturers.first_name , lecturers.last_name FROM `courses`" +
          "  LEFT JOIN categories ON categories.id =courses.category LEFT JOIN lecturers ON courses.lecturer_id = lecturers.id" +
          ` WHERE categories.id=${req.query.id}`
      }

      fileMgmt.exportToFile(res, query, 'courses');

  },


}


