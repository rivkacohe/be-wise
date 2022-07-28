const joi = require('joi');
const fileMgmt = require('../shared/fileMgmt')
const database = require('./database');


module.exports = {

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

      const query = `SELECT code, courses.name as 'name', courses.description, courses.price, courses.start_date, lecturer_id,` +
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

  getFilterdCourses: async function (req, res, next) {
   const param = req.query;
    const schema = joi.object({
      column: joi.string().min(2).required(),
      filter: joi.alternatives().try(joi.string(), joi.number()).required(),
    });

    const { error, value } = schema.validate(param);
    if (error) {
      console.log(error);
      res.status(400).send('add failed');
      return
    }

    const fieldsMap = new Map([
      ['category', 'categories.id'],
      ['lecturer_id', 'courses.lecturer_id'],
      ['code', 'courses.code'],
    ]);

      const query = `SELECT code, courses.name as 'name', courses.description, courses.price, courses.start_date, lecturer_id,` +
        " courses.num_of_classes, categories.name 'category', lecturers.first_name , lecturers.last_name FROM `courses`" +
        "  LEFT JOIN categories ON categories.id =courses.category LEFT JOIN lecturers ON courses.lecturer_id = lecturers.id" +
        ` WHERE ${fieldsMap.get(value.column)}=${value.filter}`

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
      if (!req.query.column) {
        query = `SELECT code, courses.name as 'name', courses.description, courses.price, courses.start_date,` +
          " courses.num_of_classes, categories.name 'category', lecturers.first_name , lecturers.last_name FROM `courses`" +
          "  LEFT JOIN categories ON categories.id =courses.category LEFT JOIN lecturers ON courses.lecturer_id = lecturers.id"
      }

      else {

         const param = req.query;
    const schema = joi.object({
      column: joi.string().min(2).required(),
      filter: joi.alternatives().try(joi.string(), joi.number()).required(),
    });

    const { error, value } = schema.validate(param);
    if (error) {
      console.log(error);
      res.status(400).send('add failed');
      return
    }

    const fieldsMap = new Map([
      ['category', 'categories.id'],
      ['lecturer_id', 'courses.lecturer_id'],
      ['code', 'courses.code'],
    ]);

       query = `SELECT code, courses.name as 'name', courses.description, courses.price, courses.start_date, lecturer_id,` +
        " courses.num_of_classes, categories.name 'category', lecturers.first_name , lecturers.last_name FROM `courses`" +
        "  LEFT JOIN categories ON categories.id =courses.category LEFT JOIN lecturers ON courses.lecturer_id = lecturers.id" +
        ` WHERE ${fieldsMap.get(value.column)}=${value.filter}`
      }

      fileMgmt.exportToFile(res, query, 'courses');

  },

  addStudent:async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
        first_name: joi.string().required().min(2).max(50),
        last_name: joi.string().required().min(2).max(50),
        address: joi.string().required().min(2).max(300),
        gender: joi.string().required().min(2).max(10),
        course_code: joi.string().required().min(2).max(4),
        email: joi.string().required().regex(/^[^@]+@[^@]+$/),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
        res.send(`error adding customer: ${error}`);
        return;
    }

    const sql =
        "INSERT INTO students(first_name, last_name,address,gender,course_code, email)" +
        " VALUES(?,?,?,?,?,?);";

    try {
        const result = await database.query(
            sql,
            [value.first_name, value.last_name, value.address, value.gender, value.course_code, value.email]
        );

        value.id = result[0].insertId;
        res.json(value);
    }
    catch (err) {
        console.log(err);
        return;
    }
},

}


