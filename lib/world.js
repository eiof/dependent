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
  _players: [],

  createWorldPlayer: function (attributes) {
    var playerFactory = new PlayerFactory();
    var player = playerFactory.buildPlayerWithParty(attributes);
    this._players.push(player);
    this._debug('Player joined: ' + player.name + '.');
    return player;
  },

  releasePlayer: function (player) {
    player.release();
    this._players = _.without(this._players, player);
    this._debug('Player released: ' + player.name + '.');
  },

  getPlayers: function () {
    return this._players;
  },

  getRandomVulnerablePlayer: function () {
    var vulnerablePlayers = [];
    vulnerablePlayers = _.filter(this._players, function (player){
      return player.getVulnerability();
    });
    return _.sample(vulnerablePlayers);
  },

  _debug: function (message) {
    console.log('W: ' + message + ' Players: ' + _.pluck(this._players, 'name'));
  }
});
