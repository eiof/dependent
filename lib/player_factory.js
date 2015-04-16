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
module.exports = PlayerFactory = (function () {

  return Class.extend({

    createPlayer: function (attributes) {
      return new Player(attributes);
    },

    createPlayerWithParty: function (attributes) {
      var player = this.createPlayer(attributes);
      var party = new Party();
      player.joinParty(party);
      return player;
    }
  });
})();
