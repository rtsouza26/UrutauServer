var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helmet = require('helmet');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());
app.disable('x-powered-by');



app.use('/', indexRouter);
app.use('/users', usersRouter);



module.exports = app;
