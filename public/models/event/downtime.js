/*global define*/
define(function (require) {
  'use strict';

  var Backbone = require('backbone');

  var Downtime = Backbone.Model.extend({
    initialize: function () {
      this.setPlayerChoices();
      this.beginSelectionTime();
    }

    beginSelectionTime: function () {
      var self = this;
      this.timeout = setTimeout(function () {
      }, 10000);
    }

    stopSelectionTime: function () {
      clearTimeout(this.timeout);
    }
  });

  return Downtime;
});
