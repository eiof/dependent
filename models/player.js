/*jslint node: true */
'use strict';

var Backbone = require('backbone');

var Player = Backbone.Model.extend({
  urlRoot: '/',
  defaults: {
    groupPlayers: []
  },

  initialize: function () {
    this.get('groupPlayers').push(this);
  }
});

module.exports = Player;
