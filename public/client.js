/*global define*/
define(function (require) {

  $(document).ready(function () {
    window.socket = io.connect('http://localhost');

    var ClientView = require('./views/client');

    var clientView = new ClientView({
      el: $('.client')
    });

    window.socket.on('player joined group', function (otherPlayer) {
      $('ul.group-list').append('<li id="player-' + otherPlayer.id + '">' + otherPlayer.data.name  + '</li>');
    });

    window.socket.on('player left group', function (otherPlayer) {
      $('ul.group-list > #player-' + otherPlayer.id + '').remove();
    });
  });
});
