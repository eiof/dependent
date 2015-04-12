/*jslint node: true */
'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var Player = require('../models/player');

var Players = Backbone.Collection.extend({
  model: Player,

  getRandomPlayer: function () {
    return _.sample(this.models);
  }
});

module.exports = new Players();
