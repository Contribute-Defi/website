import React, { useEffect, useState } from 'react';
import { useEthers } from '../../app';
import { Statistic } from './Statistic';
import { formatEther } from 'ethers/lib/utils';
import { ethers, Contract } from 'ethers';

// generic interface for multiple mstable contracts
import mstableArtifacts from '../../../contract/IMStable.json';
const mstableAbi = mstableArtifacts.abi;

const APPROX_BLOCKS_PER_DAY = 6500;
const SECONDS_PER_YEAR = 365 * 24 * 3600;

export function CurrentApy() {
	const { contracts, provider } = useEthers();
	const [apy, setApy] = useState('00.00');

	async function computeApy() {
		try {
			const nexusGovernanceAddress = await contracts.vault.nexusGovernance();
			const musdAddress = await contracts.vault.reserve();
			const nexusGovernance = new Contract(nexusGovernanceAddress, mstableAbi, provider);
			const moduleHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('SavingsManager'));
			const savingsManagerAddress = await nexusGovernance.getModule(moduleHash);
			const savingsManager = new Contract(savingsManagerAddress, mstableAbi, provider);
			const savingsContractAddress = await savingsManager.savingsContracts(musdAddress);
			const savingsContract = new Contract(savingsContractAddress, mstableAbi, provider);
			const blockNumber = await provider.getBlockNumber();
			const blocksDiff = APPROX_BLOCKS_PER_DAY * 7;

			const currentBlock = await provider.getBlock(blockNumber);
			const pastBlock = await provider.getBlock(blockNumber - blocksDiff);
			const tsDiff = currentBlock.timestamp - pastBlock.timestamp;
			const intervalsPerYear = SECONDS_PER_YEAR / tsDiff;

			const currentExchangeRate = await savingsContract.exchangeRate({ blockTag: blockNumber });
			const pastExchangeRate = await savingsContract.exchangeRate({ blockTag: pastBlock.number });
			const rateDiff = formatEther(currentExchangeRate) / formatEther(pastExchangeRate);
			const floatApy = Math.pow(rateDiff, intervalsPerYear) - 1;
			let niceApy = Math.round(floatApy * 10000) / 100;

			// format
			let x = niceApy.toString().split('.');
			x[0] = x[0].padStart(2, '0');
			x[1] = x[1] ? x[1].padEnd(2, '0') : '00';
			setApy(x.join('.'));
		} catch (e) {
			console.error(e);
			setApy('err.??');
		}

		window.setTimeout(computeApy, 1000 * 3600); // reload once per hour
	}

	useEffect(() => {
		if (contracts) {
			computeApy();
			(async () => {})();
		}
	}, [contracts]);
	return <Statistic id="apy" value={apy} />;
}
