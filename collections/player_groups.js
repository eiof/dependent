/*jslint node: true */
'use strict';

var Backbone = require('backbone');

var PlayerGroup = require('../models/player_group');

var PlayerGroups = Backbone.Collection.extend({
  model: PlayerGroup
});

module.exports = new PlayerGroups();
