/*jslint node: true*/
'use strict';

var _ = require('underscore');
var Class = require('./bin/class');
var Party;

/**
 * Party - A group of players
 *
 * @module Party
 */
module.exports = Party = Class.extend({
  hostPlayer: null,
  players: [],

  init: function (foundingPlayers) {
    console.log(this.hostPlayer);
    this.players = foundingPlayers;
    if (this.players && this.players.length > 0) {
      this.hostPlayer = this.players[0];
    }
  },

  getHost: function () {
    return this.hostPlayer;
  },

  setHost: function (player) {
    this.hostPlayer = player;
  },

  getPlayers: function () {
    return this.players;
  },

  addPlayer: function (player) {
    this.addPlayers([player]);
  },

  addPlayers: function (players) {
    this.players = _.union(this.players, players);
    if (!this.hostPlayer && this.players.length > 0) {
      this.setHost(this.players[0]);
    }
    console.log('P: Player joined party. ' + this.hostPlayer.name + ' is host. Party players: ' + _.pluck(this.players, 'name'));
  },

  removePlayer: function (player) {
    this.removePlayers([player]);
  },

  removePlayers: function (players) {
    this.players = _.difference(this.players, players);
    if (_.contains(players), this.hostPlayer) {
      this.setHost(this.players[0]);
    }
    console.log('P: Player left party. ' + this.hostPlayer.name + ' is host. Party players: ' + _.pluck(this.players, 'name'));
  }
});
