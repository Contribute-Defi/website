import React from 'react';
import { SectionHeroGenesis, SectionFooter, SectionJoin, SectionPurchaseGenesis } from '../section';
import { StatusMessage } from '../ui';

export function PageGenesis() {
	return (
		<>
			<StatusMessage />
			<SectionHeroGenesis />
			<SectionPurchaseGenesis />
			<SectionJoin />
			<SectionFooter />
		</>
	);
}
