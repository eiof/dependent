/*global define*/
define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Backbone = require('backbone');
  var _ = require('underscore');

  var PlayerView = Backbone.View.extend({

    initialize: function (options) {
      this.model = options.model;
      this.listenTo(this.model, 'change', this.stream, this);
      this.render();
    },

    stream: function () {
      var values = this.model.toJSON();
      _.each(values, function (value, key) {
        var $valueEl = this.$('.' + key);
        if ($valueEl.length > 0) {
          $valueEl.find('.value').html(value);
        }
      }, this);
    },

    render: function () {
    }

  });

  return PlayerView;

});
