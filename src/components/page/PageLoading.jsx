import React from 'react';
import { StatusMessage } from '../ui';
import { SectionHero, SectionPurchase, SectionStats, SectionClaim, SectionJoin, SectionFooter } from '../section';

export function PageLoading() {
	return (
		<>
			<StatusMessage />
			<SectionHero />
			<SectionStats />
			<SectionJoin />
			<SectionFooter />
		</>
	);
}
