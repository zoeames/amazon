'use strict';

var TrelloStrategy = require('passport-trello').Strategy,
    User = require('../../models/user'),
    config = require('../../../config.js'),
    trello = new TrelloStrategy(
              {
                consumerKey: config.trello.consumerKey,
                consumerSecret: config.trello.consumerSecret,
                callbackURL: config.trello.callbackUrl
              },
              User.trelloAuthenticate);

module.exports = trello;
