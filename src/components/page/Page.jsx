import React, { useState, useEffect } from 'react';
import { useEthers } from '../../app';
import { PageComingSoon, PageGenesis, PageContribute } from '.';
import { TestControls } from '../ui/TestControls';

export function Page() {
	const [isGenesis, setIsGenesis] = useState();
	const { contracts } = useEthers();

	async function checkGenesis() {
		const gme = await contracts.contribute.GME();
		if (gme) {
			window.setTimeout(() => checkGenesis(), 6000);
		}
		setIsGenesis(gme);
	}

	useEffect(() => {
		(async () => {
			if (contracts) {
				await checkGenesis();
			}
		})();
	}, [contracts]);

	const isComingSoon = process.env.COMING_SOON === '1';
	const isTest = process.env.TEST === '1';

	if (isGenesis === undefined) {
		return <span>loading...</span>;
	}

	return (
		<>
			{isComingSoon ? <PageComingSoon /> : isGenesis ? <PageGenesis /> : <PageContribute />}
			{isTest && <TestControls />}
		</>
	);
}
