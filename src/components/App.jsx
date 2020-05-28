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
};

const drizzle = new Drizzle(drizzleOptions);

const App = () => (
	<DrizzleContext.Provider drizzle={drizzle}>
		<DrizzleContext.Consumer>
			{drizzleContext => {
				// eslint-disable-next-line no-shadow
				const { drizzle, drizzleState, initialized } = drizzleContext;
				if (!initialized) {
					return 'Loading...';
				}
				return (
					<div className="app">
						<SectionHero drizzle={drizzle} drizzleState={drizzleState} />
						<SectionPurchase />
						<SectionStats drizzle={drizzle} drizzleState={drizzleState} />
						<SectionMintBurn drizzle={drizzle} drizzleState={drizzleState} />
						<SectionJoin />
						<SectionFooter />
					</div>
				);
			}}
		</DrizzleContext.Consumer>
	</DrizzleContext.Provider>
);

export default App;
