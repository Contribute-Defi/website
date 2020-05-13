import React from 'react';
import { Container } from 'react-bootstrap';

import Header from './Header';
import Hero from './Hero';
import Stats from './Stats';

function App() {
	return (
		<Container fluid="md">
			<Header />
			<Hero />
			<Stats />
		</Container>
	);
}

export default App;
