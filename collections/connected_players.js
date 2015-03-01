/*jslint node: true */
'use strict';

var Backbone = require('backbone');

var ConnectedPlayer = require('../models/player_group');

var ConnectedPlayers = Backbone.Collection.extend({
  model: ConnectedPlayer
});

module.exports = new ConnectedPlayers();
