import $ from 'jquery';

const Player = ({
	profile: {
		gender: 'male',
		name: { first: 'Fallback', last: 'Character', title: 'Dr.'},
		age: Math.floor(Math.random() * 80) + 10  ,
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
			url: 'http://api.randomuser.me/',
			dataType: 'json'
		}).success((data) => {
			this.processRandomUser(data.results[0].user);
		});
	},

	processRandomUser: function(userData){
		this.profile.name = userData.name;

		console.log('character', this.profile);

	}
});

export default Player;
