/*jslint node: true*/
'use strict';

var _ = require('underscore');
var PlayerFactory = require('./player_factory');
var SocketStream;

var World = require('./world');
var World = new World();

/**
 * SocketStream - Handles socket communication
 *
 * @module SocketStream
 */
module.exports = SocketStream = function (socket) {

  socket.on('player join', function (data) {

    // Add player's server data
    _.extend(data.player, {
      id: socket.id,
      socket: socket
    });

    // Add player to server
    this.player = World.createWorldPlayer(data.player);
  });

  socket.on('player vulnerable', function (isVulnerable) {
    if (this.player) {
      this.player.setVulnerability(isVulnerable);
    }
  });

  socket.on('player encounter chance', function () {
    var encounteredPlayer = World.getRandomVulnerablePlayer();
    if (encounteredPlayer && (encounteredPlayer.id !== socket.id)) {
      var playerParty = this.player.getParty();
      if(!playerParty.isPlayerInParty(encounteredPlayer)) {
        this.player.joinParty(encounteredPlayer.getParty());
      }
    }
  });

  socket.on('disconnect', function () {
    if (this.player) {
      World.releasePlayer(this.player);
      delete this.player;
    }
  });

  socket.on('player dead', function(){
    if (this.player) {
      World.releasePlayer(this.player);
      delete this.player;
    }
    socket.emit('player release');
  });

  socket.on('play again', function(){
    socket.emit('restart');
  });
};
