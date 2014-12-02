var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');

server.listen(3000);

app.use(express.static(__dirname + '/public'));

var playerClients = [];
var players = [];

io.on('connection', function (socket) {

  // Record new client
  playerClients.push(socket);

  socket.on('new player', function (data) {
    console.log(new Date() + ' Event: new player ' + socket.id);

    // Relay current players to new player
    _.each(players, function (player) {
      socket.emit('player joined group', player);
    });

    // Record new player
    var player = {
      id: socket.id,
      data: data.player
    };
    players.push(player);

    // Relay new player to current players
    io.emit('player joined group', player);
  });

  socket.on('disconnect', function () {
    console.log(new Date() + ' Event: player ' + socket.id + ' disconnected');

    // Remove from recorded clients
    var i = playerClients.indexOf(socket);
    playerClients.splice(i, 1);

    // Remove from recorded players and inform current players of removal
    var player = _.findWhere(players, { id: socket.id });
    players = _.without(players, player);
    io.emit('player left group', player);
  });
});
