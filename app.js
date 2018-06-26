var express = require('express');
var session = require('express-session');
var app = express();
var db = require('./db');
var expressHbs = require('express-handlebars');
app.engine('hbs', expressHbs({extname:'hbs'}));
app.set('views', __dirname + '/');
app.set('view engine', 'hbs');
global.__root   = __dirname + '/'; 
app.get('/',function(req,res){
	res.render(__root+'register');
});


app.get('/login',function(req,res){
	res.render(__root+'login');
});

var UserController = require(__root+'UserController');
app.use('/user',UserController);
var AuthController = require(__root+ 'AuthController');
app.use('/user/auth', AuthController);
app.use(session({ secret: 'thisissecretkey', resave: false, saveUninitialized: true, }));

// var AuthController = require(__root + 'auth/AuthController');
// app.use('/api/auth', AuthController);

module.exports = app;

