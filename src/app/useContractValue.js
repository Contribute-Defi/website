import { useState } from 'react';
import { useEthers } from './EthersContext';
import { stats } from '../config/const';
import React, { useEffect } from 'react';
import { ethers } from 'ethers';

const { formatEther } = 'ethers/lib/utils';

export function useContractValue(statName, params = []) {
	const { connected, contracts, timestamp } = useEthers();

	const [value, setValue] = useState();

	const stat = stats[statName];
	const { method = statName, contract: contractName = 'contribute', pollInterval, callback } = stat;

	useEffect(() => {
		let isMounted = true;
		if (!contracts) return;
		const contract = contracts[contractName];
		const readValueFromContract = async () => {
			let rawValue;
			try {
				rawValue = await contract[method](...params);
			} catch (e) {
				console.log(e.message);
			}
			if (callback) {
				rawValue = callback(rawValue);
			}
			if (isMounted) {
				setValue(rawValue);
				if (pollInterval && !timestamp) {
					setTimeout(readValueFromContract, pollInterval);
				}
			}
		};
		readValueFromContract().then();
		return () => {
			isMounted = false;
		};
	}, [connected, contracts, timestamp]);

	return value;
}
