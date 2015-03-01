/*jslint node: true */
'use strict';

var Backbone = require('backbone');

var ConnectedPlayer = require('./models/connected_player');

var ConnectedPlayers = Backbone.Collection.extend({
  model: ConnectedPlayer
});

module.exports = new ConnectedPlayers();
