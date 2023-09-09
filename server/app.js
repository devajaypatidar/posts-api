// server/app.js
require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const bodyParser  = require('body-parser');


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

module.exports = app;

