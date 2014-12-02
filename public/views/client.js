/*global define*/
define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Backbone = require('backbone');
  var _ = require('underscore');

  var Player = require('../models/player');
  var PlayerView = require('./player');
  var ActionView = require('./action');

  var progressTicker = null;

  var ClientView = Backbone.View.extend({

    initialize: function (options) {
      this.player = new Player();
      this.subviews = {};
      this.subviews.playerView = new PlayerView({
        model: this.player,
        el: $('.player-view')
      });
      this.subviews.actionView = new ActionView({
        model: this.player,
        el: $('.action-view')
      });
      this.render();
    },

    render: function () {
    }

  });

  return ClientView;

});
