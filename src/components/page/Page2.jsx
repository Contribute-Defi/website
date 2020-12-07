import React from 'react';
import { Container } from 'react-bootstrap';
import {
	SectionEventDetails,
	SectionTrib,
	SectionFooter,
	SectionJoin,
	SectionPurchaseSimple,
	SectionIntroducing,
} from '../section';
import SectionJoinContribute from '../section/SectionJoinContribute';
import { BuySell, GenesisStats } from '../ui';
import Header from '../ui/Header';

export function Page2() {
	return (
		<div className="page2">
			<Header activePath="govern" />
			<SectionTrib />
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
