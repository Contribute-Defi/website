import React from 'react';
import {
	SectionEventDetails,
	SectionHeroGovernance,
	SectionFooter,
	SectionJoin,
	SectionPurchaseSimple,
	SectionIntroducing,
	SectionJoinContribute,
} from '../section';
import Header from '../ui/Header';

export function Page2() {
	return (
		<div className="page2">
			<Header activePath="govern" />
			<SectionHeroGovernance />
			<SectionIntroducing />
			<SectionEventDetails />
			<SectionPurchaseSimple />
			<SectionJoinContribute />
			<SectionJoin />
			<SectionFooter />
		</div>
	);
}

export default Page2;
