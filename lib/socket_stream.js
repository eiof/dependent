/*jslint node: true */
'use strict';

var _ = require('underscore');

var ConnectedPlayers = require('../collections/connected_players');
var PlayerGroups = require('../collections/player_groups');

module.exports = function (socket) {

  var connectedPlayer = {};
  var playerGroup = {};

  socket.on('new player', function (data) {
    _.extend(data.player, {
      playerTag: data.player.name.replace(/\s+/g, '-'),
      socketId: socket.id
    });
    connectedPlayer = ConnectedPlayers.add(data.player);
    playerGroup = PlayerGroups.add({
      groupId: socket.id,
      groupPlayers: [socket.id]
    });
    connectedPlayer.set('playerGroup', playerGroup);
    console.log(new Date() + ' Player: ' + connectedPlayer.get('name') + ' (' + connectedPlayer.get('socketId') + ') joined');
  });

  socket.on('chance for encounter', function () {

    // If more than one player, and random chance of 66%
    if (ConnectedPlayers.length > 1 && Math.random() >= 0.66) {
      var playersInGroup = playerGroup.get('groupPlayers');
      var playersNotInGroup = _.difference(_.pluck(PlayerGroups.pluck('groupPlayers')), playersInGroup);

      // If there are players not in this player's group
      if (playersNotInGroup.length > 0) {

        // Grab a player to have an encounter with
        var groupMet = _.sample(PlayerGroups);
        var groupPlayersMet = groupMet.get('groupPlayers');

        // console.log(new Date() + ' Encounter: ' + player.meta.name + ' encountered ' + playerMet.meta.name);

        // Auto join group for now
        // console.log(new Date() + ' Group: ' + player.meta.name + '\'s group joined ' + playerMet.meta.name + '\'s group');

        // var playersInEncounteredGroup = _.where(players, { groupId: playerMet.groupId });
        // player.groupId = playerMet.groupId;

        // _.each(groupPlayersMet, function (encounterdGroupPlayer) {
        //   groupPlayerMet.socket.emit('player joined group', );
        //   socket.emit('player joined group', encounterdGroupPlayer.meta);
        // });
      } else {
        socket.emit('no encounter');
      }
    } else {
      socket.emit('no encounter');
    }
  });

  socket.on('disconnect', function () {
    console.log(new Date() + ' Player: ' + connectedPlayer.get('name') + ' (' + connectedPlayer.get('socketId') + ') disconnected');
    ConnectedPlayers.remove(connectedPlayer);
    connectedPlayer.destroy();
  });
};
