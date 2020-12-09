import React from 'react';
import { StatusMessage } from '../ui';
import { SectionHeroTrade, SectionPurchase, SectionStats, SectionClaim, SectionJoin, SectionFooter } from '../section';

export function PageLoading() {
	return (
		<>
			<StatusMessage />
			<SectionHeroTrade />
			<SectionStats />
			<SectionJoin />
			<SectionFooter />
		</>
	);
}
