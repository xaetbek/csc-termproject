var createError = require("http-errors");
var express = require("express");
var favicon = require('serve-favicon');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var handlebars = require("express-handlebars");
var sessions = require('express-session'); 
var mysqlSessions = require('express-mysql-session')(sessions); 
var flash = require('express-flash'); 

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require('./routes/posts'); 
var commentRouter = require('./routes/comments'); 

var errorPrint = require('./helpers/debug/debugprinters').errorPrint; 
var requestPrint = require('./helpers/debug/debugprinters').requestPrint; 

var validator = require('express-validator'); 

var dbRouter = require('./routes/dbtest'); 

var app = express();

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"), //where to look for layouts
        partialsDir: path.join(__dirname, "views/partials"), // where to look for partials
        extname: ".hbs", //expected file extension for handlebars files
        defaultLayout: "home", //default layout for app, general template for all pages in app
        helpers: {
            emptyObject: (obj) => {
                return !(obj.constructor === Object && Object.keys(obj).length === 0);
            } //adding new helpers to handlebars for extra functionality
        }
    })
);

var mysqlSessionStore = new mysqlSessions(
    {

    }, 
    require('./config/database')
); 

app.use(sessions({
    key: "csid", 
    secret: "this is a secret from csc317", 
    store: mysqlSessionStore, 
    resave: false, 
    saveUninitialized: false
})); 

// view engine setup
app.use(flash()); 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use("/public", express.static(path.join(__dirname, "public")));

/*
app.use(validator()); 
app.use(sessions({secret: 'max', saveUninitialized: false, resave: false})); 
*/



app.use((req, res, next) => {
    requestPrint(req.url); 
    next(); 
}); 


app.use((req, res, next) => {
    console.log(req.session); 
    if (req.session.username) {
        res.locals.logged = true; 
    }
    next(); 
}); 


app.use('/', indexRouter);              // route middleware from ./routes/index.js
app.use('/dbtest', dbRouter);   
app.use('/users', usersRouter);         // route middleware from ./routes/users.js
app.use('/posts', postsRouter); 
app.use('/comments', commentRouter); 


app.use((err, req, res, next) => {
    console.log(err); 
   // res.render('error', {err_message: err}); 
    res.render('error'); 
});


module.exports = app;