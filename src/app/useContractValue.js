import { useState } from 'react';
import { useEthers } from './EthersContext';
import { stats } from '../config/const';
import React, { useEffect } from 'react';
import ethers from 'ethers';

const { formatEther } = ethers.utils;

export function useContractValue(statName, params = []) {
	const { connected, contracts, timestamp } = useEthers();

	const [value, setValue] = useState();

	const stat = stats[statName];
	console.log({ statName, stat, timestamp });
	const { method = statName, contract: contractName = 'contribute', pollInterval, callback } = stat;

	useEffect(() => {
		if (!connected || !contracts) return;

		const contract = contracts[contractName];
		const readValueFromContract = async () => {
			let rawValue = await contract[method](...params);
			if (callback) {
				rawValue = callback(rawValue);
			}
			setValue(rawValue);
			if (pollInterval && !timestamp) {
				setTimeout(readValueFromContract, pollInterval);
			}
		};
		readValueFromContract().then();
	}, [connected, contracts, timestamp]);

	if (!connected) {
		return undefined;
	} else {
		return value;
	}
}
