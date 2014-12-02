/*global define*/
define(function (require) {

  $(document).ready(function () {
    window.socket = io.connect('http://localhost');

    var Player = require('./models/player');
    var PlayerView = require('./views/player');
    var player = new Player();
    var playerView = new PlayerView({
      model: player,
      el: $('.player-view')
    });

    window.socket.on('player joined group', function (player) {
      $('ul.group-list').append('<li id="player-' + player.id + '">' + player.data.name  + '</li>');
    });

    window.socket.on('player left group', function (player) {
      console.log('player left');
      console.log(player);
      $('ul.group-list > #player-' + player.id + '').remove();
    });
  });
});
