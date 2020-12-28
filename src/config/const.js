import IconBurned from '../assets/icon-burned.svg';
import IconSupply from '../assets/icon-supply.svg';
import IconFloor from '../assets/icon-floor.svg';
import IconPrice from '../assets/icon-price.svg';

import imageVisionary from '../assets/nft/VISIONARY.jpg';
import imageExplorer from '../assets/nft/EXPLORER.jpg';
import imageAlchemist from '../assets/nft/ALCHEMIST.jpg';
import imageVoyager from '../assets/nft/VOYAGER.jpg';
import imageLegend from '../assets/nft/LEGEND.jpg';
import imageSupreme from '../assets/nft/SUPREME.jpg';
import imageImmortal from '../assets/nft/IMMORTAL.jpg';
import imageDivinity from '../assets/nft/DIVINITY.jpg';

export const USE_UNISWAP_PRICE = false;

export const LINKS = {
	telegram: 'https://t.me/joinchat/GKigSxj3yFWFFFjQjUN7RA',
	discord: 'https://discord.gg/XdCmKyr',
	twitter: 'https://twitter.com/TRIBtoken',
	medium: 'https://medium.com/contribute-defi',
	dappquery: 'https://dashboard.dappquery.com/contribute',
	github: 'https://github.com/Contribute-Defi',
};

export const nfts = {
	VISIONARY: 0,
	EXPLORER: 1,
	ALCHEMIST: 2,
	VOYAGER: 3,
	LEGEND: 4,
	SUPREME: 5,
	IMMORTAL: 6,
	DIVINITY: 7,
};

export const nftImages = {
	VISIONARY: imageVisionary,
	EXPLORER: imageExplorer,
	ALCHEMIST: imageAlchemist,
	VOYAGER: imageVoyager,
	LEGEND: imageLegend,
	SUPREME: imageSupreme,
	IMMORTAL: imageImmortal,
	DIVINITY: imageDivinity,
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
	lleTribContributed: {
		unit: 'TRIB',
		label: 'TRIB contributed',
		contract: 'uiView',
		method: 'tribContributed',
		decimals: 0,
	},
	lleTribContributedUsd: {
		unit: 'USD',
		label: 'TRIB contributed',
		contract: 'uiView',
		method: 'tribContributed',
		decimals: 0,
	},
	tdaoPriceTRIB: {
		unit: 'TRIB',
		label: 'TDAO Price Floor**',
		contract: 'uiView',
		decimals: 2,
		params: [USE_UNISWAP_PRICE],
	},
	tdaoPriceUSD: {
		unit: 'USD',
		label: 'TDAO Price',
		contract: 'uiView',
		method: 'tdaoPriceUSD',
		decimals: 2,
		params: [USE_UNISWAP_PRICE],
	},
	trigPriceTRIB: {
		unit: 'TRIB',
		label: 'TRIG Price',
		contract: 'uiView',
		decimals: 2,
	},
	trigPriceUSD: {
		unit: 'USD',
		label: 'TRIG Price',
		contract: 'uiView',
		decimals: 2,
		params: [USE_UNISWAP_PRICE],
	},
	tribPriceUSD: {
		unit: 'USD',
		label: 'TRIB Price',
		contract: 'uiView',
		decimals: 4,
	},
	tribFloor: {
		unit: 'USD',
		label: 'TRIB Virtual Price Floor*',
		contract: 'uiView',
		decimals: 2,
	},
	tdaoMaxSupply: {
		unit: 'TDAO',
		label: 'TDAO Max. Supply',
	},
	trigMaxSupply: {
		unit: 'TRIG',
		label: 'TRIG Max. Supply',
	},
	eventStartTime: {
		contract: 'uiView',
	},
	eventEndTime: {
		contract: 'uiView',
	},
	lleAccountContributed: {
		contract: 'uiView',
		method: 'contributed',
		label: 'Contributed',
		unit: 'TRIB',
	},
	nftBalance: {
		label: 'Balance',
		unit: 'NFT',
		// this one is just a placeholder, values are passed directly. that's why no contract/method
	},
	trigApy: {
		contract: 'uiView',
		method: 'apyTrig',
		label: 'APY',
		unit: '%',
		decimals: 2,
		callback: (x) => x.mul(100),
	},
	trigBalance: {
		contract: 'trig',
		method: 'balanceOf',
		label: 'Balance',
		unit: 'TRIG',
	},
	trigStaked: {
		contract: 'trigRewardsVault',
		method: 'userInfo',
		label: 'Staked',
		unit: 'TRIG',
		params: [0], // first param always zero
		callback: (x) => x.amount,
	},
	trigPendingReward: {
		contract: 'trigRewardsVault',
		method: 'pendingReward',
		label: 'Earned',
		decimals: 3,
		unit: 'TDAO',
		params: [0], // first param always zero
	},

	apyNft: {
		contract: 'uiView',
		label: 'APY',
		decimals: 2,
		unit: '%',
		callback: (x) => x.mul(100),
	},
	nftStaked: {
		contract: 'nftRewardsVault',
		method: 'userInfo',
		unit: 'NFT',
		label: 'Staked',
		callback: (x) => x.amount,
	},
	nftPendingReward: {
		contract: 'nftRewardsVault',
		method: 'pendingReward',
		unit: 'TDAO',
		label: 'Earned',
		decimals: 3,
	},
	trigValue: {
		label: 'Value',
		contract: 'trigRewardsVault',
		method: 'pendingReward',
		decimals: 2,
		params: [0],
		multiplyByTdaoPrice: true,
		unit: 'USD',
	},
	nftValue: {
		label: 'Value',
		contract: 'nftRewardsVault',
		method: 'pendingReward',
		decimals: 2,
		multiplyByTdaoPrice: true,
		unit: 'USD',
	},
};
