const { dbName, dbUrl } = require("./mongoDB");
const { PORT, HOST } = require("./server");
const { JWT_SECRET, oauth } = require("./jwt");
module.exports = {
    dbUrl, dbName, JWT_SECRET, oauth, PORT, HOST
}