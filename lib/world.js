/*jslint node: true*/
'use strict';

var _ = require('underscore');
var PlayerFactory = require('./player_factory');
var Class = require('./bin/class');
var World;

/**
 * World - Entity all other entities may have reference to
 *
 * @module World
 */
module.exports = World = Class.extend({
  players: [],

  createWorldPlayer: function (attributes) {
    var playerFactory = new PlayerFactory();
    var player = playerFactory.createPlayerWithParty(attributes);
    this.players.push(player);
    this._debugPlayers();
    return player;
  },

  removePlayer: function (player) {
    _.without(this.players, player);
    this._debugPlayers();
  },

  getPlayers: function () {
    return this.players;
  },

  _debugPlayers: function () {
    console.log('W: Players: ' + _.pluck(this.players, 'name'));
  }
});
