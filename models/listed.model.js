const mongoose = require('mongoose');


const listedSchema = new mongoose.Schema({
    name : String , 
    price : Number,
    creator : mongoose.ObjectId  ,
  });


module.exports = listedSchema ;


const dbConnection = require('../controllers/db.controller');
const Listed =dbConnection.model('Listed',listedSchema,'listed');
module.exports.model = Listed;