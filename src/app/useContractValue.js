import { useState } from 'react';
import { useEthers } from './EthersContext';
import { stats } from '../config/const';
import React, { useEffect } from 'react';
import { USE_UNISWAP_PRICE } from '../config/const';
import { BigNumber } from 'ethers';

export function useContractValue(statName, params = []) {
	const { connected, contracts, timestamp } = useEthers();

	const [value, setValue] = useState();

	const stat = stats[statName];
	const { method = statName, contract: contractName = 'contribute', pollInterval, callback } = stat;
	// params are joined from const.js definitions and actual call.
	// ! any variable parameter has to be passed on call level (e.g. in <Statistic params={}>)
	params = [...(stat.params || []), ...params];

	useEffect(() => {
		let isMounted = true;
		if (!contracts) return;
		const contract = contracts[contractName];
		const readValueFromContract = async () => {
			let rawValue;
			try {
				// console.log('call', contractName, method, params);
				rawValue = await contract[method](...params);
			} catch (e) {
				console.error(`error calling ${contractName}.${method}`, params);
				console.error(e.message);
			}

			if (callback) {
				rawValue = await callback(rawValue);
			}
			// DANGER!!!
			// super adhoc scheisse because someone promised he'll put all readonly data in UIView but he didn't !!!
			if (stat.multiplyByTdaoPrice) {
				const tdaoPrice = await contracts.uiView.tdaoPriceUSD(USE_UNISWAP_PRICE);
				rawValue = rawValue.mul(tdaoPrice).div(BigNumber.from(10).pow(18));
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
