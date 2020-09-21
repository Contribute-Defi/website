import React, { useState, useEffect } from 'react';
import { useEthers } from '../../app';
import { PageComingSoon, PageGenesis, PageContribute, PageLoading } from '.';
import { TestControls } from '../ui/TestControls';

export function Page() {
	const { contracts, isGenesis, onUpdate } = useEthers();

	async function reloadChainData() {
		onUpdate();
		window.setTimeout(() => reloadChainData(), 30000);
	}

	useEffect(() => {
		window.setTimeout(() => reloadChainData(), 6000);
	}, [contracts]);

	const isComingSoon = process.env.COMING_SOON === '1';
	const isTest = process.env.TEST === '1';

	let page;
	if (isComingSoon) {
		page = <PageComingSoon />;
	} else if (!contracts || isGenesis === undefined) {
		page = <PageLoading />;
	} else {
		page = isGenesis ? <PageGenesis /> : <PageContribute />;
	}
	return (
		<>
			{page}
			{isTest && <TestControls />}
		</>
	);
}
