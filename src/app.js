'use strict';

// require dependencies
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('./database/mongoose');

const routes = require('./routes/index');
// const names = require('./Database/models/Names');
const names = require('./Database/models/names')
require('dotenv').config();

// bootstrap our app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.get("/json", (req,res) =>{
  //res.json(
    //{ "message" : "hi krishna" }
  //);
  //});

console.log(process.env.dev_KEY);

  app.get("/json", function(req,res) {
    if (process.env.key == "development") {
      res.json(
        {"dev": "HI KRISHNA"}
      );
    } else {
      res.json(
        {"prod" : "hi krishna"}
      )
    }
  });

  
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// our basic route to serve the index page

app.get('/demo', (req, res) => {
  names.find()
      .then((demo) => res.send(demo))
      .catch((error) => console.log(error));
});

app.post('/add',(req, res) => {
  // var demo1 = names();
  // demo1.name = "afghjhj";
  // demo1.save().then((demo) => res.send(demo))
  // .catch((error) => console.log(error));
  console.log(req.body.name);
  
  (new names(req.body)).save()
  .then((names) => res.send(names))
  .catch((err)=> res.send(err))
});

// app.get('/abc', (req, res) => {
//   res.send("abc here")
// });

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const port = 4000;
app.listen(port, () => console.log("Backend : Server connected on port 4000"));

module.exports = app;
