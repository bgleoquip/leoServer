var test = require("./allSchema/testSchema");

var allSchema = {
    test: test
}

var getSchema = function (schemaName) {
    return allSchema[schemaName];
}
module.exports = { getSchema }

