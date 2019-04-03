const { PORT, dbName, dbUrl } = require("./mongoDB");
const {JWT_SECRET} = require("./jwt");
module.exports = {
    dbUrl,dbName,PORT,JWT_SECRET
}