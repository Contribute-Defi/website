import React from 'react';

import SectionHero from './Section/SectionHero';
import SectionStats from './Section/SectionStats';
import SectionJoin from './Section/SectionJoin';
import SectionFooter from './Section/SectionFooter';
import SectionPurchase from './Section/SectionPurchase';
import SectionMintBurn from './Section/SectionMintBurn';

function App() {
	return (
		<div className="app">
			<SectionHero />
			<SectionPurchase />
			<SectionStats />
			<SectionMintBurn />
			<SectionJoin />
			<SectionFooter />
		</div>
	);
}

export default App;
