/*global define*/
define(function (require) {
  'use strict';

  var Backbone = require('backbone');

  // Placeholder until I can generate names randomly on my own
  var RandomUser = Backbone.Model.extend({
    url: 'http://api.randomuser.me/'
  });

  return RandomUser;
});
