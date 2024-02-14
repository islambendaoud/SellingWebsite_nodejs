const mongoose = require('mongoose');

// definition of schema
const userSchema = new mongoose.Schema({
    name : String,
    money : Number  ,
    bought : [],
    login : {
              type : String,
              required : true,
              unique : true
            },
    password : {
                type : String,
                required : true
               },
    admin : {
              type : Boolean,
              default: false
            },
});


module.exports = userSchema; 
// model
const dbConnection = require('../controllers/db.controller');
const User = dbConnection.model('User',userSchema,'users');
module.exports.model = User;
