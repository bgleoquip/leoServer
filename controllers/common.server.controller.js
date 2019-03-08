const express = require('express');

const { setMongo, connection, getDB, connect, getPrimaryKey } = require("./db");
// const collection = "test";
const app = express();

const { getAggregationArray } = require("aggregation-query");


// parses json data sent to us by the user 
// app.use(bodyParser.json());

// serve static html file to user
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// read 
function getAllItems(req, res) {
    var clientInput = req.body.options;
    var aggregateArray = getAggregationArray(req);
    var collection = clientInput.collection;
    connection(collection).aggregate(aggregateArray).toArray((err, documents) => {
        if (err)
            console.log(err);
        else {
            res.json(documents);
        }
    });
}
// update
function updateAnItem(req, res) {
    var clientInput = req.body.options;
    var collection = clientInput.collection;
    connection(collection).findOneAndUpdate(clientInput.selector, { $set: clientInput.data }, function (err, result) {
        if (result) {
            getAllItems(req, res);
        }
        else res.json({ result: result, document: result.ops[0], msg: "Successfully inserted!!!", error: null });
    });

}
// create

function addValidItem(req, res) {
    var clientInput = req.body.options;
    var collection = clientInput.collection;
    connection(collection).insertOne(clientInput.data, function (err, result) {
        if (result) {
            getAllItems(req, res);
        }
        else res.json({ result: result, document: result.ops[0], msg: "Successfully inserted!!!", error: null });
    });
}

// delete    need to work on multiple delete
function removeAnItem(req, res) {
    var clientInput = req.body.options;
    var collection = clientInput.collection;
    connection(collection).findOneAndDelete(clientInput.selector, function (err, result) {
        if (result) {
            getAllItems(req, res);
        }
        else res.json({ result: result, document: result.ops[0], msg: "Successfully delted!!!", error: null });
    });

}
// delete by id
function removeById(req, res) {
    var clientInput = req.body.options;
    var collection = clientInput.collection;
    var connection = getDB().collection(collection);
    const docId = req.params.id;
    connection.findOneAndDelete({ _id: getPrimaryKey(docId) }, function (err, result) {
        if (result) {
            getAllItems(req, res);
        }
        else res.json({ result: result, document: result.ops[0], msg: "Successfully delted!!!", error: null });
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

connect((err) => {
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
    setMongo,
    getAllItems,
    updateAnItem,
    addValidItem,
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