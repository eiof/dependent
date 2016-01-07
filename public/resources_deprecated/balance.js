define(function (require) {

  var balance = {
    ablities: {
      carryWeight: {
        min: 25,
        max: 75,
        multiplier: 0.2 // Mutliplied against vigor
      }
    },
    mentality: {
      startTotal: 300, // All mentality starting values must add up to this number for fairness between new players
      confidence: {
        min: 0,
        max: 200,
        startMin: 50,
        startMax: 150
      },
      hope: {
        min: 0,
        max: 200,
        startMin: 50,
        startMax: 150
      },
      sanity: {
        min: 0,
        max: 200,
        startMin: 50,
        startMax: 150
      }
    },
    physicality: {
      startTotal: 300,
      hydration: {
        min: 0,
        max: 200,
        startMin: 50,
        startMax: 150
      },
      satiation: {
        min: 0,
        max: 200,
        startMin: 50,
        startMax: 150
      },
      vigor: {
        min: 0,
        max: 200,
        startMin: 50,
        startMax: 150
      }
    }
  };
  return balance;

});
