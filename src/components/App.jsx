import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';

import Contribute from '../../contract/Contribute.json';
import ViewContribute from '../../contract/ViewContribute.json';

import SectionHero from './Section/SectionHero';
import SectionStats from './Section/SectionStats';
import SectionJoin from './Section/SectionJoin';
import SectionFooter from './Section/SectionFooter';
import SectionPurchase from './Section/SectionPurchase';
import SectionMintBurn from './Section/SectionMintBurn';

const drizzleOptions = {
	contracts: [
		Contribute,
		ViewContribute,
	],
	events: {
		Contribute: ['TokensBought', 'TokensSold', 'MintAndBurn'],
	},
	networkWhitelist: [42],
};

const drizzle = new Drizzle(drizzleOptions);

const App = () => (
	<DrizzleContext.Provider drizzle={drizzle}>
		<div className="app">
			<SectionHero />
			<SectionPurchase />
			<SectionStats />
			<SectionMintBurn />
			<SectionJoin />
			<SectionFooter />
		</div>
	</DrizzleContext.Provider>
);

export default App;
