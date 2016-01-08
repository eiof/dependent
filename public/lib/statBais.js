import ForEach from 'lodash/collection/forEach';

const StatBaisModel = {
	gender: {
		female: { vigor: -1, hope: +2, confidence: -1, sanity: 0 },
		male: { vigor: +1, hope:-2, confidence: +1, sanity: 0 }
	},
	age: [
		{
			min: 0,
			max: 20,
			stats: { vigor: +1, hope: +1, confidence: -2, sanity: -1 }
		},{
			min: 21,
			max: 30,
			stats: { vigor: +1, hope: +1, confidence: +1, sanity: 0 }
		},{
			min: 31,
			max: 40,
			stats: { vigor: 0, hope: +2, confidence: +1, sanity: 0 }
		},{
			min: 41,
			max: 65,
			stats: { vigor: 0, hope: +2, confidence: +1, sanity: -1 }
		},{
			min: 66,
			max: 100,
			stats: { vigor: -1, hope: +4, confidence: 0, sanity: -2 }
		},
	]
};

let newStatObj = { vigor: 0, hope: 0, confidence: 0, sanity: 0};

const StatBais = ({
	baisAge: function(age, stats){
		ForEach(StatBaisModel.age, (ageGroup) => {
			if(ageGroup.min <= age && ageGroup.max >= age){
				newStatObj = this.baisManipulation(stats, ageGroup.stats);
			}
		});

		return newStatObj;
	},

	baisGender: function(gender, stats){
		ForEach(StatBaisModel.gender, (genderGroup, key) => {
			if(key == gender){
				newStatObj = this.baisManipulation(stats, genderGroup);
			}
		});

		return newStatObj;
	},

	baisManipulation: function(stats, alterStatObj){
		ForEach(alterStatObj, (value, key) => {
			stats[key] += value;
		});

		return stats;
	}
});


export default StatBais;