
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
//var mongoose = require('mongoose');

//var passport = require('passport');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;//temp local

//var flash    = require('connect-flash');
var handlebars = require('express3-handlebars');
var port = 3500;
var index = require('./routes/index');
// Example route
// var user = require('./routes/user');

var app = express();

/*
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

    // set up our express application
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms

    app.set('view engine', 'ejs'); // set up ejs for templating

    // required for passport
    app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

});
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured pas
*/

// all environments
app.set('port', process.env.PORT || 3500);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('UCSD SmartLiner secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
// Example route
// app.get('/users', user.list);


//temp local strategy

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));




var io = require('socket.io').listen(app.listen(port));//app.listen(port);
console.log("Listening on port " + port);

/***** Connection Handler That Every Socket.io App should Begin With *****/
io.sockets.on('connection', function (socket) 
{
    socket.emit('message', { message: 'welcome to the chat' });
    //socket.emit('geoloc', data);
    socket.on('send', function (data)
    {
        io.sockets.emit('message', data);
    });

    socket.on('geoloc', function (data)
    {
        io.sockets.emit('message', data);
    });
	/*socket.on('allight', function (data)
	{
		io.sockets.emit('allightGirl', data);
	});

    socket.on('shut', function (data)
    {
    	io.sockets.emit('shutGirl', data);
    });

    socket.on('light', function (data)
    {
    	io.sockets.emit('lightGirl', data);
    });

    socket.on('blow', function (data)
    {
    	io.sockets.emit('blowGirl', data);
    });
    socket.on('quit', function (data)
    {
    	io.sockets.emit('quitGirl', data);
    });*/
});