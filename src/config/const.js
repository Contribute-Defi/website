import IconBurned from '../assets/icon-burned.svg';
import IconSupply from '../assets/icon-supply.svg';
import IconFloor from '../assets/icon-floor.svg';
import IconPrice from '../assets/icon-price.svg';


// eslint-disable-next-line import/prefer-default-export
export const stats = {
	lockedContributions: {
		unit: 'DAI',
		label: 'Locked Contributions',
	},
	continuousEarning: {
		unit: 'DAI',
		label: 'Continuous Earnings',
	},
	interestRate: {
		unit: '%',
		label: 'Interest Rate (APY)',
		divideBy: 1e8,
	},
	interestPoolTotal: {
		unit: 'DAI',
		label: 'Interest Bearing Pool',
	},
	availableToBurn: {
		unit: 'DAI',
		label: 'Available to burn',
	},
	priceAfterBurn: {
		unit: 'DAI',
		label: 'Burning TRIB will increase its price to',
	},
	price: {
		unit: 'DAI/TRIB',
		label: 'Price',
		image: IconPrice,
	},
	floor: {
		unit: 'TRIB',
		label: 'Floor',
		image: IconFloor,
	},
	totalBurned: {
		unit: 'TRIB',
		label: 'Burned',
		image: IconBurned,
	},
	supply: {
		unit: 'TRIB',
		label: 'Supply',
		image: IconSupply,
	},
};
