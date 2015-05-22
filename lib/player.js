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
  _vulnerable: true,
  _party: null,

  init: function (attributes) {
    _.extend(this, attributes);
  },

  getVulnerability: function () {
    return this._vulnerable;
  },

  setVulnerability: function (isVulnerable) {
    this._vulnerable = isVulnerable;
  },

  getParty: function () {
    return this._party;
  },

  setParty: function (party) {
    if (this._party) {
      this.leaveParty();
    }
    this._party = party;
  },

  joinParty: function (party) {
    this.setParty(party);
    party.addPlayer(this);
  },

  leaveParty: function () {
    this._party.removePlayer(this);
  },

  release: function () {
    this._party.removePlayer(this);
    this._vulnerable = null;
    this._party = null;
  }
});
