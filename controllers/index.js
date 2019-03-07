const { setMongo,
    getAllItems,
    updateAnItem,
    addAnItem,
    removeAnItem,
    removeById
} = require("./common.server.controller");

// need to get from config.js
setMongo("testC", "mongodb://localhost:27017");

module.exports = {
    getAllItems,
    updateAnItem,
    addAnItem,
    removeAnItem,
    removeById
}