const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const Joi = require('joi');

const db = require("../db");
// const collection = "todo";
const app = express();

const { getAggregationArray } = require("aggregation-query");

// schema used for data validation for our todo document
const schema = Joi.object().keys({
    collection: Joi.string().required(),
    data: {
        name: Joi.string(),
        description: Joi.string()
    }
});



// parses json data sent to us by the user 
app.use(bodyParser.json());

// serve static html file to user
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// read 
function getAllItems(req, res) {
    var clientInput = req.body.options;
    console.log(clientInput);
    var aggregateArray = getAggregationArray(req);
    var collection = clientInput.collection;
    var connection = db.getDB().collection(collection);
    connection.aggreagte(aggregateArray, function (err, result) {
        if (result) {
            return res.json(result);
        }
    });
}
// update
function updateAnItem(req, res) {
    var clientInput = req.body.options;
    var collection = clientInput.collection;
    var connection = db.getDB().collection(collection);
    connection.findOneAndUpdate(clientInput.selector, { $set: clientInput.data }, function (err, result) {
        if (result) {
            getAllItems(req, res);
        }
        else res.json({ result: result, document: result.ops[0], msg: "Successfully inserted!!!", error: null });
    });

}
// create
function addAnItem(req, res, next) {
    var clientInput = req.body.options;
    Joi.validate(clientInput, schema, (err, result) => {
        if (err) {
            console.log(err);
            const error = new Error("Invalid Input");
            error.status = 400;
            next(error);
        } else {
            var collection = clientInput.collection;
            var connection = db.getDB().collection(collection);
            connection.insertOne(clientInput.data, function (err, result) {
                if (result) {
                    getAllItems(req, res);
                }
                else res.json({ result: result, document: result.ops[0], msg: "Successfully inserted!!!", error: null });
            });
        }
    });
}
// delete    need to work on multiple delete
function removeAnItem(req, res) {
    var clientInput = req.body.options;
    var collection = clientInput.collection;
    var connection = db.getDB().collection(collection);
    const docId = clientInput.id;
    connection.findOneAndDelete(clientInput.selector, function (err, result) {
        if (result) {
            getAllItems(req, res);
        }
        else res.json({ result: result, document: result.ops[0], msg: "Successfully delted!!!", error: null });
    });

}
// delete by id
function removeById(req, res) {
    var clientInput = req.body.options;
    Joi.validate(clientInput, schema, (err, result) => {
        if (err) {
            const error = new Error("Invalid Input");
            error.status = 400;
        } else {
            var collection = clientInput.collection;
            var connection = db.getDB().collection(collection);
            const docId = req.params.id;
            connection.findOneAndDelete({ _id: db.getPrimaryKey(docId) }, function (err, result) {
                if (result) {
                    getAllItems(req, res);
                }
                else res.json({ result: result, document: result.ops[0], msg: "Successfully delted!!!", error: null });
            });
        }
    });

}

// Middleware for handling Error
// Sends Error Response Back to User
app.use(function (err, req, res, next) {
    res.status(err.status).json({
        error: {
            message: err.message
        }
    });
})

db.connect((err) => {
    // If err unable to connect to database
    // End application
    if (err) {
        console.log('unable to connect to database');
        process.exit(1);
    }
    // // Successfully connected to database
    // // Start up our Express Application
    // // And listen for Request
    // else{
    //     app.listen(3000,()=>{
    //         console.log('connected to database, app listening on port 3000');
    //     });
    // }
});
module.exports = {
    getAllItems,
    updateAnItem,
    addAnItem,
    removeAnItem,
    removeById
}
/*
    var clientInput = {
    model: "test",
    redux: "test",
    data: {},
    selector:{},
    collection:"test"
    uid: null,
    caseSensitive: false,
    searchText: "",
    searchFields: ["description", "name"],
}
*/