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
  _hostPlayer: null,
  _players: [],

  init: function (foundingPlayers) {
    this._players = foundingPlayers || [];
    if (this._players && this._players.length > 0) {
      this._hostPlayer = this._players[0];
      this._debug('Player(s) joined group. ' + this._hostPlayer.name + ' is host.');
    }
  },

  getHost: function () {
    return this._hostPlayer;
  },

  setHost: function (player) {
    this._hostPlayer = player;
  },

  getPlayers: function () {
    return this._players;
  },

  isPlayerInParty: function (player) {
    var match = _.filter(this._players, function (partyPlayer) {
      return partyPlayer.id === player.id;
    });
    return !!match.length;
  },

  addPlayer: function (player) {
    this.streamPlayerJoinedParty(player);
    this._players.push(player);
    if (!this._hostPlayer && this._players.length > 0) {
      this.setHost(this._players[0]);
    }
    this._debug('Player(s) joined group. ' + this._hostPlayer.name + ' is host.');
  },

  addPlayers: function (players) {
    players.forEach(this.addPlayers);
  },

  streamPlayerJoinedParty: function (playerJoining) {
    var playerJoiningDetails = _.pick(playerJoining, 'name', 'tag');
    this._players.forEach(function (player) {
      player.socket.emit('player joined party', playerJoiningDetails);
      var playerDetails = _.pick(player, 'name', 'tag');
      playerJoining.socket.emit('player joined party', playerDetails);
    });
  },

  removePlayer: function (player) {
    this._players = _.difference(this._players, [player]);
    if (this._players.length > 0) {
      this.streamPlayerLeftParty(player);
      if (_.contains(player, this._hostPlayer)) {
        this.setHost(this._players[0]);
        this._debug('Player left group. ' + this._hostPlayer.name + ' is host.');
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
    this._players.forEach(function (player) {
      player.socket.emit('player left party', playerDetails);
    });
  },

  release: function () {
    this._hostPlayer = null;
    this._players = null;
  },

  _debug: function (message) {
    console.log('P: ' + message + ' ' + _.pluck(this._players, 'name'));
  }
});
