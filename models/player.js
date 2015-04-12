/*jslint node: true */
'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var Player = Backbone.Model.extend({
  urlRoot: '/',

  initialize: function () {
    var group = [this];
    this.set('tag', this.get('name').replace(/\s+/g, '-'));
    this.set('group', group);
  },

  getDemographics: function () {
    var demographics = ['name', 'tag'];
    return _.pick(this.attributes, demographics);
  }
});

module.exports = Player;
