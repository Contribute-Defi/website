import web3 from 'web3';

// eslint-disable-next-line import/prefer-default-export
export const fromWei = (amount, { divideBy = 1, decimals = 3 }) => parseFloat(
	parseFloat(web3.utils.fromWei(amount)) / divideBy,
).toLocaleString(undefined, { maximumFractionDigits: decimals });
