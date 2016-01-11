import $ from 'jquery';
import StatBasis from './statBais.js'
import Item from './item.js'
import ForEach from 'lodash/collection/forEach';

const Player = ({
	options: {
		userApiUrl: 'http://api.randomuser.me/'
	},
	profile: {
		loaded: false,
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
		},
		items: {
			backpack: {
				maxSize: 24,
				contents: {}
			},
			person: {
				head: null,
				torso: null,
				legs: null,
				feet: null,
				hands: {
					left: null,
					right: null
				},
			}
		}
	},

	generate: function(parent){
		this.options.processingNewPlayer = true;

		$.ajax({
			url: this.options.userApiUrl,
			dataType: 'json',
			async: true
		}).success((data) => {
			this.processRandomUser(data.results[0].user);
			this.profile.loaded = true;
			parent.setState({player: this.profile});
		}).error((data) =>{
			console.log('Warning! Failed to generate random user data from api, reverting to back up.', data);
		});
	},

	processRandomUser: function(userData){
		ForEach(['name', 'picture', 'gender'], (key)=>{
			this.profile[key] = userData[key];
 		});

		this.profile.stats = StatBasis.processStatBais(this.profile.age, this.profile.gender, this.profile.stats);
		this.profile.items = Item.generateStarterSet(this.profile.items);
	}
});

export default Player;
