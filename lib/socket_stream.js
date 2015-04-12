/*jslint node: true */
'use strict';

var _ = require('underscore');

var Players = require('../collections/players');

module.exports = function (socket) {

  socket.on('new player', function (data) {

    // Add player's server data
    _.extend(data.player, {
      id: socket.id,
      socket: socket
    });

    // Add player to server
    this.player = Players.add(data.player);
    console.log('+: ' + this.player.get('name') + ' (' + socket.id + ') joined!');
  });

  socket.on('chance for encounter', function () {
    if (Players.length > 1 && Math.random() <= 0.99) {

      var encounteredPlayer = Players.getRandomPlayer();
      console.log('!: ' + this.player.get('name') + ' encountered ' + encounteredPlayer.get('name'));

      var groupPlayerIds = _.pluck(this.player.get('group'), 'id');
      var inGroup = _.contains(groupPlayerIds, encounteredPlayer.id);
      if (!inGroup) {
        var encounteredGroup = encounteredPlayer.get('group');
        this.player.set('group', encounteredGroup);
        console.log('!: ' + this.player.get('name') + ' joined ' + encounteredPlayer.get('name'));

        var self = this;
        _.each(this.player.get('group'), function (playerMet) {
          var playerMetSocket = playerMet.get('socket');
          playerMetSocket.emit('player joined group', _.pick(self.player.attributes, 'name', 'tag'));
          socket.emit('player joined group', _.pick(playerMet.attributes, 'name', 'tag'));
        });
      } else {
        socket.emit('no encounter');
      }
    } else {
      socket.emit('no encounter');
    }
  });

  socket.on('disconnect', function () {
    if (this.player) {
      console.log('-: ' + this.player.get('name') + ' (' + socket.id + ') disconnected :(');
      // this.player.destroy({silent: true}); <- not working because of ajax :(
    }
  });
};
