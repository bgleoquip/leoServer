const Joi = require('joi');
var testSchema = {
    data: {
        name: Joi.string(),
        description: Joi.string()
    }
}

module.exports = testSchema;