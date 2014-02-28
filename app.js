
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
//var mongoose = require('mongoose');

var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;//temp local
var flash = require('connect-flash');
var handlebars = require('express3-handlebars');
var port = 3500;
var index = require('./routes/index');

// Example route
// var user = require('./routes/user');

var app = express();

var users = [
    { id: 1, username: 'Jason Jiang', password: 'smartjason', email: 'zijiang@ucsd.edu' }
  , { id: 2, username: 'Rosiee Sirimitr', password: 'smartrosiee', email: 'happyheartmee@gmail.com' }
  , { id: 3, username: 'Khang Mach', password: 'smartkevin', email: 'kkmach@ucsd.edu' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.email === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
      process.nextTick(function () {

      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        console.log('hehe');
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown Email Address ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));


/*temp local strategy

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
));*/
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
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

  app.get('/', function(req, res){
    res.render('index', { user: req.user });
  });

  /*app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
  });*/

  app.get('/signin', function(req, res){
    res.render('signin', { user: req.user});
  });

  app.get('/main', ensureAuthenticated,function(req, res){
    res.render('main', { user: req.user });
  });
  // POST /login
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  //
  //   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
  app.post('/signin', 
    passport.authenticate('local', { failureRedirect: '/signin'}),
    function(req, res) {
      res.redirect('/main');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

// Add routes here
app.get('/', index.view);

// Example route
// app.get('/users', user.list);

var io = require('socket.io').listen(app.listen(port));//app.listen(port);
console.log("Listening on port " + port);

/***** Connection Handler That Every Socket.io App should Begin With *****/
io.sockets.on('connection', function (socket) 
{
    socket.emit('message', { message: 'Welcome to Carpool Chat!' });
    //socket.emit('geoloc', data);
    socket.on('send', function (data)
    {
        io.sockets.emit('message', data);
    });

    socket.on('geoloc', function (data)
    {
        io.sockets.emit('message', data);
    });

    /*socket.on('shut', function (data)
    {
    	io.sockets.emit('shutGirl', data);
    });*/

});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/signin');
}