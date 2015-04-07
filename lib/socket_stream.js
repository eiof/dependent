/*jslint node: true */
'use strict';

var _ = require('underscore');

var Players = require('../collections/players');
var PlayerGroups = require('../collections/player_groups');

module.exports = function (socket) {

  socket.on('new player', function (data) {

    // Add player's server data
    _.extend(data.player, {
      id: socket.id,
      playerTag: data.player.name.replace(/\s+/g, '-'),
      socket: socket
    });

    // Add player to server
    this.player = Players.add(data.player);
    this.playerGroup = this.player.get('group');
    console.log(new Date() + ' Player: ' + this.player.get('name') + ' (' + socket.id + ') joined');
  });

  socket.on('chance for encounter', function () {
    // If more than one player, more than one group and random chance of 66%
    if (Players.length > 1 && PlayerGroups.length > 1 && Math.random() >= 0.66) {

      // This socket's player group


      // Find all other player groups
      var otherPlayerGroups = _.reject(PlayerGroups.models, function (model) {
        return model.id === this.playerGroup.id;
      });

      // Sample one
      var otherPlayerGroup = _.sample(otherPlayerGroups);
      console.log('This: ' + this.playerGroup.id);
      console.log('Other: ' + otherPlayerGroup.id);

      // var playersInGroup = playerGroup.get('groupPlayers');
      // var playersNotInGroup = _.difference(_.pluck(PlayerGroups.pluck('groupPlayers')), playersInGroup);
      //
      // // If there are players not in this player's group
      // if (playersNotInGroup.length > 0) {
      //
      //   // Grab a player to have an encounter with
      //   var playerMet = _.sample(playersNotInGroup);
      //   var groupMet = playerMet.get('playerGroup');
      //   PlayerGroups.mergeGroups(playerGroup, groupMet);

        // console.log(new Date() + ' Encounter: ' + player.meta.name + ' encountered ' + playerMet.meta.name);

        // Auto join group for now
        // console.log(new Date() + ' Group: ' + player.meta.name + '\'s group joined ' + playerMet.meta.name + '\'s group');

        // var playersInEncounteredGroup = _.where(players, { groupId: playerMet.groupId });
        // player.groupId = playerMet.groupId;

        // _.each(groupPlayersMet, function (encounterdGroupPlayer) {
        //   groupPlayerMet.socket.emit('player joined group', );
        //   socket.emit('player joined group', encounterdGroupPlayer.meta);
        // });
      // } else {
      //   socket.emit('no encounter');
      // }
    } else {
      socket.emit('no encounter');
    }
  });

  socket.on('disconnect', function () {
    console.log(new Date() + ' Player: ' + this.player.get('name') + ' (' + socket.id + ') disconnected');
    this.player.destroy();
  });
};
