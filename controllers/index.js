const { setMongo,
    getAllItems,
    updateAnItem,
    addValidItem,
    removeAnItem,
    removeById
} = require("./common.server.controller");

// need to get from config.js
setMongo("testC", "mongodb://localhost:27017");

const Joi = require('joi');
// schema used for data validation for our test document
const schema = Joi.object().keys({
    options: {
        collection: Joi.string().required(),
        data: {
            name: Joi.string(),
            description: Joi.string()
        }
    }
});

function addAnItem(req, res, next) {
    var clientInput = req.body;
    Joi.validate(clientInput, schema, (err, result) => {
        // console.log(result);
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

module.exports = {
    getAllItems,
    updateAnItem,
    addAnItem,
    removeAnItem,
    removeById
}