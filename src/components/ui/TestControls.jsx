import React from 'react';
import { ethers, Contract } from 'ethers';
import { useEthers } from '../../app';
import SavingsContractMock from '../../../contract/SavingsContractMock.json';
import { parseEther } from 'ethers/lib/utils';
// const { parseEther } = ethers.utils;

export function TestControls() {
	const { contracts, signer } = useEthers();

	const style = {
		position: 'fixed',
		left: 0,
		bottom: 0,
		padding: '1rem',
		background: 'red',
		color: '#fff',
	};

	const handleConcludeGME = async () => {
		await contracts.contribute.finishMintEvent();
	};

	const handleAddInterest = async () => {
		const savings = new Contract(await contracts.vault.savingsContract(), SavingsContractMock.abi, signer);
		const amount = parseEther((Math.random() * 100).toString());
		await contracts.musd.approve(savings.address, amount);
		await savings.depositInterest(amount);
	};

	return (
		<div className="test-controls" style={style}>
			<span onClick={handleConcludeGME}>ConcludeGME</span> <span onClick={handleAddInterest}>AddInterest</span>
		</div>
	);
}
