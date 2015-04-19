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

  socket.on('player vulnerability', function () {

  });

  socket.on('player encounter', function () {

  });

  //TODO: Move decision for encounter to the client
  //
  //This is what I'm thinking:
  //1. Client "unlocks" itself from being encounter safe
  //2. Server recieves the message and dedicates a party client to deciding for a decision (host)
  //3. The party client decides, then communicates the type of decision to the server
  //4. If needed, the server provides more information about the decision
  // socket.on('chance for encounter', function () {
  //   if (Players.length > 1 && Math.random() <= 0.99) {
  //
  //     var encounteredPlayer = Players.getRandomPlayer();
  //     console.log('!: ' + this.player.get('name') + ' encountered ' + encounteredPlayer.get('name'));
  //
  //     var groupPlayerIds = _.pluck(this.player.get('group'), 'id');
  //     var inGroup = _.contains(groupPlayerIds, encounteredPlayer.id);
  //     if (!inGroup) {
  //       var encounteredGroup = encounteredPlayer.get('group');
  //       this.player.set('group', encounteredGroup);
  //       console.log('!: ' + this.player.get('name') + ' joined ' + encounteredPlayer.get('name'));
  //
  //       var self = this;
  //       _.each(this.player.get('group'), function (playerMet) {
  //         var playerMetSocket = playerMet.get('socket');
  //         playerMetSocket.emit('player joined group', _.pick(self.player.attributes, 'name', 'tag'));
  //         socket.emit('player joined group', _.pick(playerMet.attributes, 'name', 'tag'));
  //       });
  //     } else {
  //       socket.emit('no encounter');
  //     }
  //   } else {
  //     socket.emit('no encounter');
  //   }
  // });

  socket.on('disconnect', function () {
    if (this.player) {
      World.removePlayer(this.player);
      delete this.player;
    }
  });

  socket.on('player dead', function(){
      socket.emit('player release');
    });

};
