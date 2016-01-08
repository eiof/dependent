import $ from 'jquery';
import StatBasis from './statBais.js'
import ForEach from 'lodash/collection/forEach';

const Player = ({
	options: {
		userApiUrl: 'http://api.randomuser.me/'
	},

	profile: {
		gender: 'male',
		name: { 
			first: 'bailey', 
			last: 'duke', 
			title: 'mr.'
		},
		age: Math.floor(Math.random() * 80) + 10,
		stats: {
			confidence: 50,
			hope: 50,
			sanity: 50,
			satiation: 50,
			hydration: 50,
			vigor: 50
		}
	},

	generate: function(){
		$.ajax({
			url: this.options.userApiUrl,
			dataType: 'json'
		}).success((data) => {
			this.processRandomUser(data.results[0].user);
		}).error((data) =>{
			console.log('Warning! Failed to generate random user data from api, reverting to back up.', data);
		});
	},

	processRandomUser: function(userData){
		ForEach(['name', 'picture', 'gender'], (key)=>{
			this.profile[key] = userData[key];
 		});


		this.profile.stats = StatBasis.baisAge(this.profile.age, this.profile.stats);
		this.profile.stats = StatBasis.baisGender(this.profile.gender, this.profile.stats);

		console.log('Your character', this.profile);
	}
});

export default Player;