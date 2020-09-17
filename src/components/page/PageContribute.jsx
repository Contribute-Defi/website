import React from 'react';
import { StatusMessage } from '../ui';
import { SectionHero, SectionPurchase, SectionStats, SectionClaim, SectionJoin, SectionFooter } from '../section';

export function PageContribute() {
	return (
		<>
			<StatusMessage />
			<SectionHero />
			<SectionPurchase />
			<SectionStats />
			<SectionClaim />
			<SectionJoin />
			<SectionFooter />
		</>
	);
}
