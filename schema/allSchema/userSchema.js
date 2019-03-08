
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
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: new PasswordComplexity(complexityOptions)
}
module.exports = { userSchema };