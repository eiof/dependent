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
      this._debug('Player(s) joined group. ' + this.hostPlayer.name + ' is host.');
    }
  },

  removePlayer: function (player) {
    this.removePlayers([player]);
  },

  removePlayers: function (players) {
    this.players = _.difference(this.players, players);
    if (_.contains(players, this.hostPlayer)) {
      if (this.players.length > 0) {
        this.setHost(this.players[0]);
        this._debug('Player(s) left group. ' + this.hostPlayer.name + ' is host.');
      } else {
        this.release();
        this._debug('Group was released.');
      }
    }
  },

  release: function () {
    this.hostPlayer = null;
    this.players = null;
  },

  _debug: function (message) {
    console.log('P: ' + message + ' ' + _.pluck(this.players, 'name'));
  }
});
