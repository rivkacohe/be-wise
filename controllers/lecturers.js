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

}


