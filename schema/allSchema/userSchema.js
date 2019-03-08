
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const complexityOptions = {
    min: 1,
    max: 30,
    lowerCase: 0,
    upperCase: 0,
    numeric: 0,
    symbol: 0,
    requirementCount: 2,
}

/// schema
const userSchema = {
    email: Joi.string(),
    password: Joi.string()
}
module.exports = { userSchema };