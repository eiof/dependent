/*jslint node: true */
'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');
var Backbone = require('backbone');

var ConnectedPlayers = require('./collections/connected_players');

server.listen(3000);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {

  var player = {};

  socket.on('new player', function (data) {
    console.log(new Date() + ' Player: ' + data.player.name + ' joined');

    // Relay current players to new player
    // _.each(players, function (player) {
    //   socket.emit('player joined group', player);
    // });

    data.player.tag = data.player.name.replace(/\s+/g, '-');

    // Record new player
    var playerAttributes = {
      groupId: socket.id,
      meta: data.player,
      socket: socket
    };
    ConnectedPlayers.add(playerAttributes);
    console.log(ConnectedPlayers);

    // Relay new player to current players
    // io.emit('player joined group', player);
  });

  socket.on('chance for encounter', function () {

    // If more than one player, and random chance of 66%
    if (players.length > 1 && Math.random() >= 0.66) {
      var playersInGroup = _.where(players, { groupId: player.groupId });
      var playersNotInGroup = _.difference(players, playersInGroup);

      // If there are players not in this player's group
      if (playersNotInGroup.length > 0) {

        // Grab a player to have an encounter with
        playerMet = _.sample(playersNotInGroup);

        console.log(new Date() + ' Encounter: ' + player.meta.name + ' encountered ' + playerMet.meta.name);

        // Auto join group for now
        console.log(new Date() + ' Group: ' + player.meta.name + '\'s group joined ' + playerMet.meta.name + '\'s group');

        var playersInEncounteredGroup = _.where(players, { groupId: playerMet.groupId });
        player.groupId = playerMet.groupId;

        _.each(playersInEncounteredGroup, function (encounterdGroupPlayer) {
          encounterdGroupPlayer.socket.emit('player joined group', player.meta);
          socket.emit('player joined group', encounterdGroupPlayer.meta);
        });
      } else {
        socket.emit('no encounter');
      }
    } else {
      socket.emit('no encounter');
    }
  });

  socket.on('disconnect', function () {
    if (_.contains(playerIds, player.id)) {
      console.log(new Date() + ' Player: ' + player.meta.name + ' disconnected');

      // Remove from players
      players = _.without(players, player);
      playerIds = _.without(playerIds, player.id);

      var playersInGroup = _.where(players, { groupId: player.groupId });
      _.each(playersInGroup, function (groupPlayer) {
        groupPlayer.socket.emit('player left group', player);
      });
    }
  });
});
