/*global require*/
(function () {
  'use strict';

  require.config({
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: [
        'underscore',
        'jquery'
        ],
        exports: 'Backbone'
      }
    },
    paths: {
      jquery: '../bower_components/jquery/dist/jquery',
      backbone: '../bower_components/backbone/backbone',
      underscore: '../bower_components/underscore/underscore'
    }
  });
}());
