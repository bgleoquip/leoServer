var { testSchema } = require("./allSchema/testSchema");
var { userSchema } = require("./allSchema/userSchema.js");

const Joi = require('joi');
const allSchema = {
    "testSchema": testSchema,
    "userSchema": userSchema
}
const getSchema = function (schemaName) {
    return allSchema[schemaName]
}
module.exports = { getSchema };

