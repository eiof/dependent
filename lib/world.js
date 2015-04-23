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
    var player = playerFactory.buildPlayerWithParty(attributes);
    this.players.push(player);
    this._debug('joined');
    return player;
  },

  removePlayer: function (player) {
    player.release();
    _.without(this.players, player);
    this._debug('removed');
  },

  getPlayers: function () {
    return this.players;
  },

  getRandomVulnerablePlayer: function () {
    console.log('Getting random vulnerable player...');
    return _.sample(this.players);
  },

  _debug: function (message) {
    console.log('W: Players: ' + _.pluck(this.players, 'name') + ' ' + message);
  }
});
