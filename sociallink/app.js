const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { setMongo, connectMongoose } = require("./mongooseConnect");
const app = express();
app.use(cors());

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

//connectMongoose
connectMongoose();

//connectFBLogin

//connectGoogleLogin

// Routes
app.use('/users', require('./routes/users'));

module.exports = { app, setMongo };