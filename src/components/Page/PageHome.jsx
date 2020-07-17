import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import drizzle from '../../lib/drizzle';
import StatusMessage from '../StatusMessage';
import SectionHero from '../Section/SectionHero';
import SectionPurchase from '../Section/SectionPurchase';
import SectionStats from '../Section/SectionStats';
import SectionMintBurn from '../Section/SectionMintBurn';
import SectionJoin from '../Section/SectionJoin';
import SectionFooter from '../Section/SectionFooter';

export default function PageComingSoon() {
	return (
		<DrizzleContext.Provider drizzle={drizzle}>
			<StatusMessage />
			<SectionHero />
			<SectionPurchase />
			<SectionStats />
			<SectionMintBurn />
			<SectionJoin />
			<SectionFooter />
		</DrizzleContext.Provider>
	);
}
