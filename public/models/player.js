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
      var confidenceImpedence = ((balance.mentality.confidence.max - this.get('confidence')) * 5) / 100;
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
    }

  });

  return Player;

});
