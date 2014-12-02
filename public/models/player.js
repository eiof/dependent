/*global define, socket*/

define(function (require) {

  var Backbone = require('backbone');
  var RandomUser = require('../resources/random_user');

  var Player = Backbone.Model.extend({
    defaults: {
      name: 'John Smith',
      gender: 'male',
      age: 21,
      confidence: Math.floor((Math.random() * 200)),
      hope: Math.floor((Math.random() * 200)),
      sanity: Math.floor((Math.random() * 200)),
      satiation: Math.floor((Math.random() * 200)),
      thirst: Math.floor((Math.random() * 200)),
      vigor: Math.floor((Math.random() * 200))
    },

    initialize: function () {
      var randomUser = new RandomUser();
      var _self = this;
      randomUser.fetch().then(function (response) {
        var name = response.results[0].user.name.first + ' ' + response.results[0].user.name.last;
        var gender = response.results[0].user.gender;
        _self.set({
          'name': name,
          'gender': gender
        });
        window.socket.emit('new player', { player: _self.toJSON() });
      });
    }
  });

  return Player;

});
