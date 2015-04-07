/*jslint node: true */
'use strict';

var Backbone = require('backbone');

// var PlayerGroupPlayers = require('../collections/player_group_players');

var PlayerGroup = Backbone.Model.extend({
  defaults: {
    groupPlayers: []
  },
  urlRoot: '/'
});

module.exports = PlayerGroup;
