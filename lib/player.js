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
module.exports = Player = (function () {

  var internals = {
    party: null
  };

  return Class.extend({

    init: function (attributes) {
      _.extend(this, attributes);
    },

    getParty: function () {
      return internals.party;
    },

    joinParty: function (party) {
      if (internals.party) {
        internals.party.removePlayer(this);
      }
      party.addPlayer(this);
    }
  });
})();
