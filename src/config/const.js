import IconBurned from '../assets/icon-burned.svg';
import IconSupply from '../assets/icon-supply.svg';
import IconFloor from '../assets/icon-floor.svg';
import IconPrice from '../assets/icon-price.svg';

export const LINKS = {
	telegram: 'https://t.me/joinchat/GKigSxj3yFWFFFjQjUN7RA',
	discord: 'https://discord.gg/XdCmKyr',
	twitter: 'https://twitter.com/TRIBtoken',
	medium: 'https://medium.com/@kentosadim',
	dappquery: 'https://dashboard.dappquery.com/contribute',
	github: 'https://github.com/Contribute-Defi',
};

export const stats = {
	totalContributed: {
		unit: 'USD',
		label: 'Locked Contributions',
		decimals: 2,
	},
	totalReserve: {
		unit: 'USD',
		label: 'Total Deposited',
		decimals: 0,
	},
	totalInterestClaimed: {
		label: 'Total Interest Claimed',
		decimals: 2,
		unit: 'USD',
	},
	apy: {
		label: 'APY (Week Average)',
		link: 'https://app.mstable.org/analytics',
		decimals: 2,
		unit: '%',
	},
	getCurrentTokenPrice: {
		unit: 'USD',
		label: 'Price Before Tax',
		pollInterval: 5000,
		decimals: 9,
		smallDecimals: 6,
		image: IconPrice,
	},
	getBurnedTokensAmount: {
		unit: 'TRIB',
		label: 'Burned',
		pollInterval: 5000,
		// decimals: 9,
		// smallDecimals: 6,
		image: IconBurned,
	},
	getInterest: {
		unit: 'USD',
		label: 'Available to Claim',
		pollInterval: 5000,
		decimals: 3,
	},
	floor: {
		unit: 'USD',
		label: 'Floor',
		pollInterval: 5000,
		decimals: 9,
		smallDecimals: 6,
		method: 'getBurnedTokensAmount',
		callback: (x) => x.div(process.env.DIVIDER),
		image: IconFloor,
	},
	genesisAveragePrice: {
		unit: 'USD',
		label: 'Average Price',
		pollInterval: 5000,
		decimals: 9,
		smallDecimals: 6,
	},
	getTotalSupply: {
		unit: 'TRIB',
		label: 'Total Supply',
		// decimals: 2,
		image: IconSupply,
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
};
