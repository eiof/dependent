/*jslint node: true */
'use strict';

var Backbone = require('backbone');

var Player = require('../models/player');

var PlayerGroupPlayers = Backbone.Collection.extend({
  model: Player
});

module.exports = PlayerGroupPlayers;
