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

  socket.on('player vulnerability', function (isVulnerable) {
    this.player.setVulnerability(isVulnerable);
  });

  //TODO: Use host techniques (get random player from party so that way it's not always the host encountering)
  socket.on('player encounter chance', function () {
    var encounteredPlayer = World.getRandomVulnerablePlayer();
    if (encounteredPlayer.id !== this.player.id) {
      socket.emit('player joined party', _.pick(encounteredPlayer, 'name', 'tag'));
      encounteredPlayer.socket.emit('player joined party', _.pick(this.player, 'name', 'tag'));
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
