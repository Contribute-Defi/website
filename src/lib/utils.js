import { useEthers } from '../app';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

export const shortenAddress = (address) => `${address.substr(0, 6)}...${address.substr(address.length - 4)}`;

export const calculateFees = (accumulated) => {
	const ether = parseUnits('1');
	const total = accumulated;
	const base = 10000;
	const trigFee = 5000;
	const keeperFee = 10;
	const treasuryFees = [9000, 9200, 9400, 9600, 9800];
	const keeperShare = accumulated.mul(keeperFee);
};
