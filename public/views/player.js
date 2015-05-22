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
      _.each(values, function (val, key) {
        var $valueEl = this.$('.' + key);
        if ($valueEl.length > 0) {
          if(isNaN(val)){
            $valueEl.find('.value').html(val);
          } else {
            $valueEl.find('.value').html(parseInt((val/200) *100) + '%');
            $valueEl.find('.pBar').attr('max', '200');
            $valueEl.find('.pBar').attr('value', val);
          }
        }
      }, this);
    },

    render: function () {
    }

  });

  return PlayerView;

});
