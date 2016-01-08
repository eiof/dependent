import $ from 'jquery';
import ForEach from 'lodash/collection/forEach';

const ItemSet = {
	food: {
		apple: { size: 1, stats: { satiation: +5, hydration: +1, hope: +1 } },
		corn: { size: 1, stats: { satiation: +10 } },
		smallJerky: { size: 1, stats: {satiation: +20, hydration: -5, hope: +3 } }
	},
	water: {
		canteen: { size: 2, stats: { hydration:  +20, hope: +3 } },
		bottle: { size: 1, stats: { hydration:  +10, hope: +1 } },
	}
};

const Item = ({
	generateStarterSet: function(playerItemObj){
		playerItemObj.backpack.contents = this.fillStarterBackpack();

		return playerItemObj;
	},

	fillStarterBackpack: function(){
		const backpack = [];

		const items = {
			food: ['apple', 'corn', 'smallJerky'],
			water: ['canteen', 'bottle']
		};

		ForEach(items, (obj, key)=>{
			ForEach(obj, (object, itemName)=>{
				let newObj = {};
				newObj[ItemSet[key][itemName]] = object;
				
				backpack.push(newObj);
			});
		});

		return backpack;
	}
});

export default Item;