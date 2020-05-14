import React from 'react';
import { Container } from 'react-bootstrap';

import SectionHeader from './Section/SectionHeader';
import SectionHero from './Section/SectionHero';
import SectionStats1 from './Section/SectionStats1';
import SectionStats2 from './Section/SectionStats2';
import SectionHowItWorks from './Section/SectionHowItWorks';
import SectionJoin from './Section/SectionJoin';
import SectionFooter from './Section/SectionFooter';

function App() {
	return (
		<Container fluid="md">
			<SectionHeader />
			<SectionHero />
			<SectionStats1 />
			<SectionStats2 />
			<SectionHowItWorks />
			<SectionJoin />
			<SectionFooter />
		</Container>
	);
}

export default App;
