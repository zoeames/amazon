'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.logout = function(req, res){
  req.logout();
  req.flash('success', 'you have successfully logged out!');
  res.redirect('/');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.show = function(req, res){
  User.findById(req.params.id, function(err, client){
    res.render('users/show', {client:client});
  });
};

exports.edit = function(req, res){
  User.findById(req.params.id, function(err, client){
    if(res.locals.user._id.toString() === client._id.toString()){
      res.render('users/edit', {client:client});
    }else{
      res.redirect('/users/'+client._id);
    }
  });
};

exports.update = function(req, res){
  res.locals.user.save(req.body, function(){
    req.flash('notice', 'you have updated the user');
    res.redirect('/users/'+res.locals.user._id);
  });
};
