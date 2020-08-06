import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PageComingSoon, PageGenesis } from './page';
import { EthersProvider } from '../app';

const App = () => (
	<EthersProvider>
		<Router>
			<Switch>
				<Route path="/">
					<PageGenesis />
				</Route>
				<Route path="/genesis">
					<PageComingSoon />
				</Route>
			</Switch>
		</Router>
	</EthersProvider>
);

export default App;
