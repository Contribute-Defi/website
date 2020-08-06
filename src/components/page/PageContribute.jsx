import React from 'react';
import { StatusMessage } from '../ui';
import { SectionHero, SectionPurchase, SectionStats, SectionMintBurn, SectionJoin, SectionFooter } from '../section';

export function PageContribute() {
	return (
		<>
			<StatusMessage />
			<SectionHero />
			<SectionPurchase />
			<SectionStats />
			<SectionMintBurn />
			<SectionJoin />
			<SectionFooter />
		</>
	);
}
