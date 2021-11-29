var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan')
var cors = require('cors')

var indexRouter = require('./routes/index');
var statsRouter = require('./routes/stadistics');

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/mutation', indexRouter);
app.use('/stats', statsRouter);

module.exports = app;
