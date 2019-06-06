const { dbName, dbUrl, PORT } = require("./mongoDB");
const { JWT_SECRET, oauth } = require("./jwt");
module.exports = {
    dbUrl, dbName, JWT_SECRET, oauth, PORT
}