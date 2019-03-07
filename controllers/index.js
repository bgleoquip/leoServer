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
    collection: Joi.string().required(),
    data: {
        name: Joi.string(),
        description: Joi.string()
    }
});

function addAnItem(req, res, next) {
    var clientInput = req.body.options;
    Joi.validate(clientInput, schema, (err, result) => {
        if (err) {
            console.log(err);
            const error = new Error("Invalid Input");
            error.status = 400;
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