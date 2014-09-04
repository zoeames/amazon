'use strict';

var config = {};

config.twitter = {
  apiKey      : 'V9FKGI2h1snowfEx0Da8tlsvR',
  apiSecret   : process.env.TWITTER_SECRET,
  callbackUrl : 'http://myvirtual.com:3333/auth/twitter/callback'
};

config.github = {
  clientId     : 'e7fcc43a1a8e985a707f',
  clientSecret : process.env.GITHUB_SECRET,
  callbackUrl  :  'http://myvirtual.com:3333/auth/github/callback'
};

config.google = {
  clientId     : '165974308973-gmdfcafthfu5r73p7k8atg3n16m1h8ka.apps.googleusercontent.com',
  clientSecret : process.env.GOOGLE_SECRET,
  callbackUrl  : 'http://myvirtual.com:3333/auth/google/callback'
};

config.facebook = {
  clientId     : '718591891509785',
  clientSecret : process.env.FACEBOOK_SECRET,
  callbackUrl  : 'http://myvirtual.com:3333/auth/facebook/callback'
};

config.trello = {
  consumerKey     : '836925bef7375beb757e921355ca9e67',
  consumerSecret : process.env.TRELLO_SECRET,
  callbackUrl  : 'http://myvirtual.com:3333/auth/trello/callback'
};

config.stripe = {
  publishKey : 'pk_test_w54pGerbk8TgVNW1RXHGfIcv',
  secretKey  : process.env.STRIPE_SECRET
};


module.exports = config;
