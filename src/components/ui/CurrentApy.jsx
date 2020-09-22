import React, { useEffect, useState } from 'react';
import { useEthers } from '../../app';
import { Statistic } from './Statistic';
import { formatEther } from 'ethers/lib/utils';

const APPROX_BLOCKS_PER_DAY = 6500;

export function CurrentApy() {
	const { contracts, provider } = useEthers();
	const [apy, setApy] = useState('27.12');
	/*
	useEffect(() => {
		if (contracts) {
			(async () => {
				let apy;
				try {
					const totalReserve = await contracts.contribute.totalReserve();
					const blockNumber = await provider.getBlockNumber();
					const currentInterest = await contracts.contribute.getInterest();
					const pastInterest = await contracts.contribute.getInterest({ blockTag: blockNumber - 6500 });
					const dailyInterest = currentInterest.sub(pastInterest);
					const yearlyInterest = dailyInterest.mul(365);
					apy = yearlyInterest.mul(10000).div(totalReserve).toNumber() / 100;
				} catch (e) {
					apy = '00';
				}
				setApy(apy);
			})();
		}
	}, [contracts]);
*/
	return <Statistic id="apy" value={apy} />;
}
