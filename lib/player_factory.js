/*jslint node: true*/
'use strict';

var _ = require('underscore');
var Class = require('./bin/class');
var Player = require('./player');
var Party = require('./party');
var PlayerFactory;

/**
 * PlayerFactory - Produce products for the player
 *
 * @module PlayerFactory
 */
module.exports = PlayerFactory = Class.extend({

  buildPlayer: function (attributes) {
    return new Player(attributes);
  },

  buildPlayerWithParty: function (attributes) {
    var player = this.buildPlayer(attributes);
    var party = new Party();
    player.joinParty(party);
    return player;
  }
});
