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

  var deathCounter = 0;

  var ActionView = Backbone.View.extend({
    events: {
      'click button.move-onward': 'processAction',
      'click button.play-again': 'playAgain'
    },

    initialize: function (options) {
      this.model = options.model;
      this.renderOptions(true);
      //this.render();
    },

    playAgain: function(){
      window.socket.emit('play again');
      console.log("Emiting play again signal");
    },

    playerDead: function(){
      window.socket.emit('player dead');
      window.socket.on('player release', this.renderOptions(false));
      console.log("Emiting player dead");
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
      deathCounter+= 1;
      if(deathCounter < 3){
        console.log('Death will come');
        context.$('.action-message').append('<br>> there is nowhere to go but forward');
        context.renderOptions(true);
        //context.render();
      }
      else if (deathCounter >= 3){
        console.log('Death has run');
        context.playerDead();
        //context.renderOptions(false);
        //context.renderPlayAgain();
      }
    },

    renderOptions: function(x){
      if(x === true){
        this.render();
      } else if (x === false) {
        this.renderPlayAgain();
      }
    },

    render: function () {
      this.$('.action-options').html('<button class="move-onward">move onward</button>');
    },

    renderPlayAgain: function(){
      this.$('.action-options').html('<button class="play-again">play again</button>');
    }
  });

  return ActionView;

});
