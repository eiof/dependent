/*global define*/
define(function (require) {

  $(document).ready(function () {
    window.socket = io.connect('http://localhost:3000');

    var ClientView = require('./views/client');

    var clientView = new ClientView({
      el: $('.client')
    });

    window.socket.on('restart', function(){
    clientView = new ClientView({
        el: $('.client')
      });
    });

    window.socket.on('player joined party', function (otherPlayer) {
      console.log(otherPlayer);
      $('ul.group-list').append('<li id="player-' + otherPlayer.tag + '">' + otherPlayer.name  + '</li>');
    });

    window.socket.on('player left party', function (otherPlayer) {
      console.log(otherPlayer);
      $('ul.group-list > #player-' + otherPlayer.tag + '').remove();
    });
  });
});
/* This is the file where we will start a new game/rest game on death */
