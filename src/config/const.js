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
		decimals: 3,
		smallDecimals: 6,
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
		decimals: 3,
		smallDecimals: 6,
	},
	priceAfterBurn: {
		unit: 'DAI',
		label: 'Burning TRIB will increase its price to',
		decimals: 3,
		smallDecimals: 6,
	},
	price: {
		unit: 'DAI',
		label: 'Price',
		image: IconPrice,
	},
	floor: {
		unit: 'DAI',
		label: 'Floor',
		image: IconFloor,
		decimals: 3,
		smallDecimals: 6,
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
	getDaiBalance: {
		unit: 'DAI',
		label: 'DAI balance',
	},
	getTribBalance: {
		unit: 'TRIB',
		label: 'TRIB balance',
	},
	getTribToDai: {
		unit: 'DAI',
		label: 'DAI amount',
	},
	getDaiToTrib: {
		unit: 'TRIB',
		label: 'TRIB amount',
	},
};
