/*jslint node: true*/
'use strict';

var _ = require('underscore');
var Class = require('./bin/class');
var Player;

/**
 * Player - The playable entity of the game
 *
 * @module Player
 */
module.exports = Player = Class.extend({
  party: null,

  init: function (attributes) {
    _.extend(this, attributes);
  },

  getParty: function () {
    return this.party;
  },

  joinParty: function (party) {
    if (this.party) {
      this.party.removePlayer(this);
    }
    party.addPlayer(this);
  }
});
