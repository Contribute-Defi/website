import React, { useEffect, useState } from 'react';
import { useEthers } from '../../app';
import { Statistic } from './Statistic';
import { formatEther } from 'ethers/lib/utils';

const APPROX_BLOCKS_PER_DAY = 6500;

export function CurrentApy() {
	const { contracts, provider } = useEthers();
	const [apy, setApy] = useState('?');

	useEffect(() => {
		if (contracts) {
			(async () => {
				const totalReserve = await contracts.contribute.totalReserve();
				const blockNumber = await provider.getBlockNumber();
				const currentInterest = await contracts.contribute.getInterest();
				const pastInterest = await contracts.contribute.getInterest({ blockTag: blockNumber - 6500 });
				const dailyInterest = currentInterest.sub(pastInterest);
				const yearlyInterest = dailyInterest.mul(365);
				const apy = yearlyInterest.mul(10000).div(totalReserve).toNumber() / 100;
				setApy(apy);
			})();
		}
	}, [contracts]);

	return <Statistic id="apy" value={apy} />;
}
