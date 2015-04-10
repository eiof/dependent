/*jslint node: true */
'use strict';

var Backbone = require('backbone');
var PlayerGroups = require('../collections/player_groups');

var Player = Backbone.Model.extend({
  urlRoot: '/',

  initialize: function () {
    this.set('group', PlayerGroups.create({
      groupPlayers: [this]
    }));
  }


 }

});

module.exports = Player;
