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
  vulnerable: false,
  party: null,

  init: function (attributes) {
    _.extend(this, attributes);
  },

  getVulnerability: function () {
    return this.vulnerable;
  },

  setVulnerability: function (vulnerable) {
    this.vulnerable = vulnerable;
  },

  getParty: function () {
    return this.party;
  },

  joinParty: function (party) {
    if (this.party) {
      this.party.removePlayer(this);
    }
    this.party = party;
    party.addPlayer(this);
  },

  release: function () {
    this.party.removePlayer(this);
    this.vulnerable = null;
    this.party = null;
  }
});
