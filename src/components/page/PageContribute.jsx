import React from 'react';
import { StatusMessage } from '../ui';
import { SectionHero, SectionPurchase, SectionStats, SectionClaim, SectionJoin, SectionFooter } from '../section';
import Header from '../ui/Header';

export function PageContribute() {
	return (
		<>
			<Header />
			<SectionHero />
			<SectionPurchase />
			<SectionStats />
			<SectionClaim />
			<SectionJoin />
			<SectionFooter />
		</>
	);
}
