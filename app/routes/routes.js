'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    passport       = require('passport'),
    flash          = require('connect-flash'),
    passportConfig = require('../lib/passport/config'),
    security       = require('../lib/security'),
    debug          = require('../lib/debug'),
    home           = require('../controllers/home'),
    products       = require('../controllers/products'),
    cart           = require('../controllers/cart'),
    users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));
  app.use(flash());
  passportConfig(passport, app);

  app.use(security.locals);
  app.use(debug.info);

  app.get('/', home.index);
  app.get('/register', users.new);
  app.post('/register', users.create);
  app.get('/login',                  users.login);
  app.post('/login',                 passport.authenticate('local',   {successRedirect:'/', failureRedirect:'/login', successFlash:'Congrats! Successful local login', failureFlash:'WRONG local login!'}));

  app.get('/auth/twitter',           passport.authenticate('twitter'));
  app.get('/auth/twitter/callback',  passport.authenticate('twitter', {successRedirect:'/', failureRedirect:'/login', successFlash:'Congrats! Successful twitter login', failureFlash:'WRONG twitter login!'}));

  app.get('/auth/github',           passport.authenticate('github'));
  app.get('/auth/github/callback',  passport.authenticate('github', {successRedirect:'/', failureRedirect:'/login', successFlash:'Congrats! Successful github login', failureFlash:'WRONG github login!'}));

  app.get('/auth/google',           passport.authenticate('google',  {scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']}));
  app.get('/auth/google/callback',  passport.authenticate('google',  {successRedirect:'/', failureRedirect:'/login', failureFlash:'WRONG google login', successFlash:'Congrats! Successful google login.'}));

  app.get('/auth/facebook',           passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',  passport.authenticate('facebook', {successRedirect:'/', failureRedirect:'/login', successFlash:'Congrats! Successful facebook login', failureFlash:'WRONG facebook login!'}));

  app.get('/auth/trello',           passport.authenticate('trello'));
  app.get('/auth/trello/callback',  passport.authenticate('trello', {successRedirect:'/', failureRedirect:'/login', successFlash:'Congrats! Successful trello login', failureFlash:'WRONG trello login!'}));

  app.use(security.bounce);
  app.delete('/logout', users.logout);

  app.get('/users/:id', users.show);
  app.put('/users/:id', users.update);
  app.get('/users/:id/edit', users.edit);

  app.get('/products', products.index);
  app.post('/cart', cart.add);
  app.get('/cart', cart.index);
  app.delete('/cart', cart.destroy);
  app.post('/charge', cart.purchase);
  console.log('Expre`ss: Routes Loaded');
};

