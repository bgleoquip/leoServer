const Joi = require('joi');
const testSchema = {
    name: Joi.string(),
    description: Joi.string()
}

module.exports = { testSchema };