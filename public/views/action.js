/*global define*/
define(function (require) {
  'use strict';

  var $ = require('jquery');
  var Backbone = require('backbone');
  var _ = require('underscore');

  var progressTicker = null;
  var moveOnwardPlaceholder = [
    '> "this town ain\'t big enough for the two of us"... i wish that were the case &mdash; i wonder if anyone else is out here',
    '> so many beautiful empty buildings, but they look uninviting &mdash; so many strange noise, yet it\'s strangely quiet',
    '> what happened &mdash; why can\'t i remember anything &mdash; it\'s like the perfect survival game scenario has just become my life',
    '> hello.. hello.. hello.. &mdash; echo.. echo.. echo..',
    '> "i\'ve got a lovely bunch of coconuts" &mdash; mmm, i could go for some coconut now',
    '> there is nowhere to go but forward &mdash; there is nowhere to go but forward &mdash; when are the devs going to make somewhere else to go'
  ];

  var deathPlaceHolder = '> You have died';

  var ActionView = Backbone.View.extend({
    events: {
      'click button.move-onward': 'processAction',
      'click button.play-again': 'playAgain'
    },

    initialize: function (options) {
      this.model = options.model;
      this.renderOptions(1);
    },

    playAgain: function(){
      window.socket.emit('play again');
      consol.log("Emiting play again signal");
    },

    playerDead: function(){
      window.socket.emit('player dead');
      consol.log("Emiting player dead");
    },

    processAction: function (){
      window.socket.emit('player encounter chance');
      window.socket.on('no encounter', this.streamActionEvaluation());
    },

    streamActionEvaluation: function () {
      this.model.deteriorateAttributes();
      this.$('.action-message').html(_.sample(moveOnwardPlaceholder));
      this.$('.action-options').html('weighing options');
      this.streamActionEvaluationProgress();
      var weighOptionsTimeout = this.model.weighOptions(this.moveOnward, this);
    },

    streamActionEvaluationProgress: function () {
      $('.action-options').append('.');
      var self = this;
      progressTicker = setTimeout(function () {
        self.streamActionEvaluationProgress();
      }, 1000);
    },

    moveOnward: function (context) {
      clearTimeout(progressTicker);
      var deathCounter = 0;
      deathCounter+= 1;
      if(deathCaounter === 3){
        playerDead();
        context.renderOptions(2);
      }
      else {
      context.$('.action-message').append('<br>> there is nowhere to go but forward');
      context.renderOptions(1);
      }
    },

    renderOptions: function(x){
      if(x == 1){
        renderChoices();
      } else if (x == 2) {
        renderPlayAgain();
      }
    },

    renderChoices: function () {
      this.$('.action-options').html('<button class="move-onward">move onward</button>');
    },

    renderPlayAgain: function(){
      this.$('.action-options').html('<button class="play-again">play again</button>');
    }
  });

  return ActionView;

});
