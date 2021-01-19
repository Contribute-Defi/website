import React from 'react';
import { StatusMessage } from '../ui';
import { SectionHeroTrade, SectionPurchase, SectionStats, SectionClaim, SectionJoin, SectionFooter } from '../section';
import Header from '../ui/Header';

export function PageContribute() {
	return (
		<>
			<Header activePath="trib" />
			<SectionHeroTrade />
			<SectionPurchase />
			<SectionStats />
			<SectionClaim />
			<SectionJoin />
			<SectionFooter />
		</>
	);
}
