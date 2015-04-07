/*jslint node: true */
'use strict';

var Backbone = require('backbone');

var PlayerGroup = require('../models/player_group');

var PlayerGroups = Backbone.Collection.extend({
  model: PlayerGroup,

  mergeGroups: function (groupA, groupB) {
    var groupBPlayers = groupB.get('groupPlayers');
    var groupAPlayers = groupA.get('groupPlayers');

    var newGroupPlayers = groupAPlayers.concat(groupBPlayers);
    groupA.set('groupPlayers', newGroupPlayers);

    groupB.destroy();
  }
});

module.exports = new PlayerGroups();
