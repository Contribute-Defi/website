import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import drizzle from '../lib/drizzle';

import SectionHero from './Section/SectionHero';
import SectionStats from './Section/SectionStats';
import SectionJoin from './Section/SectionJoin';
import SectionFooter from './Section/SectionFooter';
import SectionPurchase from './Section/SectionPurchase';
import SectionMintBurn from './Section/SectionMintBurn';


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
