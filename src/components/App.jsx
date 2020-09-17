import React from 'react';
import { Page } from './page';
import { EthersProvider } from '../app';

const App = () => {
	return (
		<EthersProvider>
			<Page />
		</EthersProvider>
	);
};

export default App;
