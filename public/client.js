/*global define*/
define(function (require) {

  $(document).ready(function () {
    window.socket = io.connect('http://localhost');

    var ClientView = require('./views/client');

    var clientView = new ClientView({
      el: $('.client')
    });

  
    window.socket.on('play again', function(){
      var ClientView = require('./views/client');

      var clientView = new ClientView({
        el: $('.client')
      });
    });


    window.socket.on('player joined group', function (otherPlayer) {
      console.log(otherPlayer);
      $('ul.group-list').append('<li id="player-' + otherPlayer.tag + '">' + otherPlayer.name  + '</li>');
    });

    window.socket.on('player left group', function (otherPlayer) {
      $('ul.group-list > #player-' + otherPlayer.tag + '').remove();
    });
  });
});
/* This is the file where we will start a new game/rest game on death */
