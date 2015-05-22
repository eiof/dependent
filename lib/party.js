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
    //this.players = this.players.push(player);
    //if (!this.hostPlayer && this.players.length > 0) {
    //  this.setHost(this.players[0]);
    //  this._debug('Player(s) joined group. ' + this.hostPlayer.name + ' is host.');
    //}
  },

  addPlayers: function (players) {
    players.forEach(this.addPlayers);
  },

  streamPlayerJoinedParty: function (playerLeaving, reason) {
    var playerDetails = _.pick(playerLeaving, 'name', 'tag');
    this.players.forEach(function (player) {
      player.socket.emit('player joined party', playerDetails);
    });
  },

  removePlayer: function (player) {
    this.players = _.difference(this.players, [player]);
    console.log(this.players);
    if (this.players.length > 0) {
      this.streamPlayerLeftParty(player);
      if (_.contains(player, this.hostPlayer)) {
        this.setHost(this.players[0]);
        this._debug('Player left group. ' + this.hostPlayer.name + ' is host.');
      }
    } else {
      this.release();
      this._debug('Group was released.');
    }
  },

  removePlayers: function (players) {
    players.forEach(this.removePlayer);
  },

  streamPlayerLeftParty: function (playerLeaving, reason) {
    var playerDetails = _.pick(playerLeaving, 'name', 'tag');
    this.players.forEach(function (player) {
      player.socket.emit('player left party', playerDetails);
    });
  },

  release: function () {
    this.hostPlayer = null;
    this.players = null;
  },

  _debug: function (message) {
    console.log('P: ' + message + ' ' + _.pluck(this.players, 'name'));
  }
});
