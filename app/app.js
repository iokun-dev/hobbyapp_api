require('dotenv').config({
  path: `./env/${process.env.NODE_ENV || 'development'}.env`,
});

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors')
const logger = require('../logger');

let indexRouter = require('../routes/index');

let app = express();
app.use(cors())

// for parsing application/json
app.use(bodyParser.json({ limit: '50mb' }));

// for parsing application/xwww-
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api',indexRouter());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
