'use strict';

var TwitterStrategy = require('passport-twitter').Strategy,
    User    = require('../../models/user'),
    config  = require('../../../config.js'),
    twitter = new TwitterStrategy(
              {
                consumerKey:    config.twitter.apiKey,
                consumerSecret: config.twitter.apiSecret,
                callbackURL:    config.twitter.callbackUrl
              },
              User.twitterAuthenticate);

//console.log('twitter.....', config.twitter);

module.exports = twitter;
