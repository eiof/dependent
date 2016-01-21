import sample from 'lodash/collection/sample';

const ItemSet = [
	{ name: 'apple', type: 'food', size: 1, stats: { satiation: 5, hydration: 1, hope: 1 } },
	{ name: 'corn', type: 'food', size: 1, stats: { satiation: 10 } },
	{ name: 'small jerky', type: 'food', size: 1, stats: { satiation: 20, hydration: -5, hope: 3 } },
  { name: 'canteen', type: 'water', size: 2, stats: { hydration: 20, hope: 3 } },
  { name: 'bottle', type: 'water', size: 1, stats: { hydration: 10, hope: 1 } }
];

const Item = ({
  generateStarterPack: () => {
    return sample(ItemSet, 3);
  }
});

export default Item;
