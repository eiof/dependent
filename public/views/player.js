/*global define*/
define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Backbone = require('backbone');
  var _ = require('underscore');

  var progressTicker = null;

  var PlayerView = Backbone.View.extend({

    initialize: function (options) {
      this.model = options.model;
      this.listenTo(this.model, 'change', this.streamDependentAttributes, this);
      this.render();
    },

    streamDependentAttributes: function () {
      var values = this.model.toJSON();
      _.each(values, function (value, key) {
        var $valueEl = this.$('.' + key);
        if ($valueEl.length > 0) {
          if(isNaN(value)){
            $valueEl.find('.value').html(value);
          } else {
            $valueEl.find('.value').html(parseInt((value/200) *100) + '%');
          }
        }
      }, this);
    },

    render: function () {
    }

  });

  return PlayerView;

});
