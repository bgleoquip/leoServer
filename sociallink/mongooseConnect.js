const mongoose = require('mongoose');


var dburl = "mongodb://localhost:27017";
var dbname = "crud_mongodb";
const state = {
    db: null,
    dbname: dbname,
    dburl: dburl
};

const setMongo = (dbname, dburl) => {
    if (dbname) {
        state.dbname = dbname
        console.log("DB name:", state.dbname)
    }
    if (dburl) {
        state.dburl = dburl;
        console.log("DB host and port:", state.dburl)
    }
}
const connectMongoose = () => {
    mongoose.Promise = global.Promise;

    if (process.env.NODE_ENV === 'test') {
        mongoose.connect(state.dburl, { useNewUrlParser: true });
    } else {
        mongoose.connect(state.dburl, { useNewUrlParser: true });
    }
}


module.exports = { setMongo, connectMongoose };