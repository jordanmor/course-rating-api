'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const users = require('./routes/users');
const courses = require('./routes/courses');
const app = express();

app.set('port', process.env.PORT || 5000);

// Http request logging from Morgan
app.use(morgan('dev'));

//Mongoose connection
mongoose.connect('mongodb://localhost:27017/course-api', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('connection error:', err);
});

db.once('open', () => {
    console.log('db connection successful');
});

// TODO add additional routes here
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/users', users);
app.use('/api/courses', courses);

// Send a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Course Review API'
  });
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// Start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

module.exports = app; // for testing
