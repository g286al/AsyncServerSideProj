// Gal Natan 205890569
// Eliran Kotzero 316040120
// Mattan Ben Yosef 318360351

// Importing required modules and setting up routers for different routes
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importing routers to handle specific paths in the application
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const addcaloriesRouter = require('./routes/addcalories');
const aboutRouter = require('./routes/about');
const reportRouter = require('./routes/report');

// MongoDB setup: connecting to the database using Mongoose
const mongoose = require('mongoose');
const mongoDBURI = 'mongodb+srv://galnat:Hummus2024@cluster0.gkzdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoDBURI, {})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('MongoDB connection error:', err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request Path: ${req.path}`);
  next(); // Call the next middleware or route handler
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addcalories', addcaloriesRouter);
app.use('/about', aboutRouter);
app.use('/report', reportRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
