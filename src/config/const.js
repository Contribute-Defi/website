import IconBurned from '../assets/icon-burned.svg';
import IconSupply from '../assets/icon-supply.svg';
import IconFloor from '../assets/icon-floor.svg';
import IconPrice from '../assets/icon-price.svg';

export const LINKS = {
	telegram: 'https://t.me/joinchat/GKigSxj3yFWFFFjQjUN7RA',
	discord: 'https://discord.gg/XdCmKyr',
	twitter: 'https://twitter.com/TRIBtoken',
};


// eslint-disable-next-line import/prefer-default-export
export const stats = {
	totalReserve: {
		unit: 'USD',
		label: 'Total Contributed',
		contract: 'contribute',
		decimals: 2,
	},
	getCurrentTokenPrice: {
		unit: 'USD',
		label: 'TRIB Price',
		contract: 'contribute',
		pollInterval: 5000,
		decimals: 9,
		smallDecimals: 6,
	},
	averagePrice: {
		unit: 'USD',
		label: 'Average Price',
		contract: 'contribute',
		method: 'genesisAveragePrice',
		pollInterval: 5000,
		decimals: 9,
		smallDecimals: 6,
	},
	getTotalSupply: {
		unit: 'TRIB',
		label: 'Total Supply',
		contract: 'contribute',
		decimals: 2,
	},
	reserveToTokens: {
		unit: 'TRIB',
		label: 'TRIB received',
		contract: 'contribute',
		method: 'getReserveToTokensTaxed',
		decimals: 4,
	},
	tokensToReserve: {
		unit: 'mUSD',
		label: 'mUSD received',
		contract: 'contribute',
		method: 'getTokensToReserveTaxed',
		decimals: 4,
	},
	reserveBalance: {
		unit: 'mUSD',
		label: 'mUSD balance',
		contract: 'musd',
		method: 'balanceOf',
		decimals: 4,
	},
	tokenBalance: {
		unit: 'TRIB',
		label: 'TRIB balance',
		contract: 'trib',
		method: 'balanceOf',
		decimals: 4,
	},
	genesisTokenBalance: {
		unit: 'TRIB',
		label: 'TRIB balance',
		contract: 'genesis',
		method: 'getShare',
		decimals: 4,
	},
	getTribToDai: {
		unit: 'DAI',
		label: 'DAI amount',
		contract: 'contribute',
		decimals: 4,
	},
	genesisReceive: {
		unit: 'TRIB',
		label: 'You Will Receive',
		contract: 'genesis',
		method: 'getShare',
		decimals: 3,
	}
/*
	lockedContributions: {
		unit: 'DAI',
		label: 'Locked Contributions',
	},
	continuousEarning: {
		unit: 'DAI',
		label: 'Continuous Earnings',
		decimals: 3,
		smallDecimals: 6,
		continuous: true,
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
		continuous: true,
	},
	priceAfterBurn: {
		unit: 'DAI',
		label: 'Burning TRIB will increase its price to',
		decimals: 3,
		smallDecimals: 6,
		continuous: true,
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

 */
};
