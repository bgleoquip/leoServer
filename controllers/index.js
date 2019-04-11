const { setMongo, getAllItems, updateAnItem, addValidItem, removeAnItem, removeById } = require("mongo-crud-common");

// need to get from config.js
var  { dbName, dbUrl } = require('../configuration');
dbName = dbName || "testC";
dbUrl = "mongodb://localhost:27017"

if(process.env.NODE_ENV === 'test'){
    dbName = dbName+"Test";
}
setMongo(dbName, dbUrl);

console.log("mongooes",dbUrl + '/' +  dbName)
var mongoose = require("mongoose");
/// db set for user
try{
  mongoose.connect(dbUrl + '/' +  dbName, {
    useCreateIndex: true, useNewUrlParser: true});
}
catch(e){
  console.log(e)
}

const Joi = require('joi');
const { getSchema } = require("../schema/index");
// schema used for data validation for our test document
// const schema = Joi.object().keys({
//     options: {
//         collection: Joi.string().required(),
//         schema:"testSchema",
//         data: {
//             name: Joi.string(),
//             description: Joi.string()
//         }
//     }
// });

function addAnItem(req, res, next) {
    // console.log("add");
    var clientInput = req.body.options;
    Joi.validate(clientInput.data, getSchema(clientInput.schema), (err, result) => {
        if (err) {
            console.log("err");
            console.log(err.details);
            const error = new Error("Invalid Input"); //can include moragan for this 
            error.status = 400;
            error.validate = false;
            error.details = err.details;
            next(error);
        } else {
            addValidItem(req, res);
        }
    });
}

module.exports = { getAllItems, updateAnItem, addAnItem, removeAnItem, removeById };