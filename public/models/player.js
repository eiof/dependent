/*global define, socket*/

define(function (require) {

  var _ = require('underscore');
  var Backbone = require('backbone');
  var RandomUser = require('../resources/random_user');
  var balance = require('../resources/balance');

  var Player = Backbone.Model.extend({
    defaults: {
      name: 'John Smith',
      gender: 'male',
      //age: 21,
      confidence: balance.mentality.confidence.min,
      hope: balance.mentality.hope.min,
      sanity: balance.mentality.sanity.min,
      satiation: balance.physicality.satiation.min,
      hydration: balance.physicality.hydration.min,
      vigor: balance.physicality.vigor.min
    },

    initialize: function () {
      this.randomlyGenerateStartingMentality();
      this.randomlyGenerateStartingPhysicality();

      var randomUser = new RandomUser();
      var _self = this;
      randomUser.fetch().then(function (response) {
        var name = response.results[0].user.name.first + ' ' + response.results[0].user.name.last;
        var gender = response.results[0].user.gender;
        _self.set({
          'name': name,
          'gender': gender
        });
        window.socket.emit('new player', { player: _self.toJSON() });
      });

    },

    randomlyGenerateStartingMentality: function () {
      var total = balance.mentality.startTotal;
      var mentalityAttributes = ['confidence', 'hope', 'sanity'];

      _.each(mentalityAttributes, function (attribute, index) {
        var value = 0;
        if ((mentalityAttributes.length - 1) === index) {
          value = total;
        } else {
          value = this.randomlyGenerateStartingSubsetAttribute('mentality', attribute);
          total -= value;
        }
        this.set(attribute, value);
      }, this);
    },

    randomlyGenerateStartingPhysicality: function () {
      var total = balance.physicality.startTotal;
      var physicalityAttributes = ['satiation', 'hydration', 'vigor'];

      _.each(physicalityAttributes, function (attribute, index) {
        var value = 0;
        if ((physicalityAttributes.length - 1) === index) {
          value = total;
        } else {
          value = this.randomlyGenerateStartingSubsetAttribute('physicality', attribute);
          total -= value;
        }
        this.set(attribute, value);
      }, this);
    },

    randomlyGenerateStartingSubsetAttribute: function (subset, attribute) {
      var minValue = balance[subset][attribute].startMin;
      var maxValue = balance[subset][attribute].startMax;
      return Math.floor((Math.random() * (maxValue - minValue)) + minValue);
    },

    weighOptions: function (conclusion, context) {
      var confidenceImpedence = ((balance.mentality.confidence.max - this.get('confidence')) * 2) / 100;
      var weighOptions = setTimeout(function () {
        conclusion(context);
      }, (confidenceImpedence * 1000));
      return weighOptions;
    },

    deteriorateAttributes: function () {
      var deteriorationMin = 2;
      var deteriorationMax = 12;

      var attributes = ['confidence', 'hope', 'sanity', 'satiation', 'hydration', 'vigor'];
      _.each(attributes, function (attribute) {
        var currentValue = this.get(attribute);
        var deteriorateBy = Math.floor((Math.random() * (deteriorationMax - deteriorationMin)) + deteriorationMin);
        this.set(attribute, (currentValue - deteriorateBy));
      }, this);
    },

    //Code will determine if choice by player will be followed or an alternate choice made.
    decisions: function (mentality, physicality){
      if (mentality < 60 && physicality < 60){
        return  false;
      } else if((mentality < 60 && physicality > 60) || (mentaility > 60 && physicality < 60)){
        var x = Math.random();
        if ( x >= 0.50){
          return true;
        } else {
          return false;
        }
      }
    },
    
    //Code returns random choice option that character will take
    randomChoice: function(){
      var x = Math.random();
      if (x <= 0.33){
        return 'fight';
      } else if (x > 0.33 && x <= 0.66) {
        return 'walk';
      } else if (x > 0.66){
        return 'join';
      }
    },

    //Code returns which encounter will take place
    randomEncounter: function(stats){
      var x = Math.random();
      if(stats < 500 && stats > 300){
        x = x + 0.02;
      } else if(stats <= 300 && stats > 100) {
        x = x + 0.06;
      } else if(stats <= 100){
        x = x + 0.1;
      }
      if(x <= 0.33){
        return 'player';
      } else if (x <= 0.66){
        return'zombie';
      } else {
        return 'self';
      }

    }


  });

  return Player;

});
