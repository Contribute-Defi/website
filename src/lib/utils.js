import web3 from 'web3';

// eslint-disable-next-line import/prefer-default-export
export const fromWei = (amount, maximumFractionDigits = 3) => parseFloat(
	web3.utils.fromWei(amount),
).toLocaleString(undefined, { maximumFractionDigits });
