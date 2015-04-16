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
module.exports = Party = (function () {

  var internals = {
    hostPlayer: null,
    players: []
  };

  return Class.extend({

    init: function (foundingPlayers) {
      console.log(internals);
      internals.players = foundingPlayers;
      if (internals.players && internals.players.length > 0) {
        internals.hostPlayer = internals.players[0];
      }
    },

    getHost: function () {
      return internals.hostPlayer;
    },

    setHost: function (player) {
      internals.hostPlayer = player;
    },

    getPlayers: function () {
      return internals.players;
    },

    addPlayer: function (player) {
      this.addPlayers([player]);
    },

    addPlayers: function (players) {
      internals.players = _.union(internals.players, players);
      if (!internals.hostPlayer && internals.players.length > 0) {
        this.setHost(internals.players[0]);
      }
      console.log('P: Player joined party. ' + internals.hostPlayer.name + ' is host. Party players: ' + _.pluck(internals.players, 'name'));
    },

    removePlayer: function (player) {
      this.removePlayers([player]);
    },

    removePlayers: function (players) {
      internals.players = _.difference(internals.players, players);
      if (_.contains(players), internals.hostPlayer) {
        this.setHost(internals.players[0]);
      }
      console.log('P: Player left party. ' + internals.hostPlayer.name + ' is host. Party players: ' + _.pluck(internals.players, 'name'));
    }
  });
})();
