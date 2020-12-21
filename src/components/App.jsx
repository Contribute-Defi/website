import React from 'react';
import { Page } from './page';
import { EthersProvider } from '../app';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PageGovern from './page/PageGovern';

const App = () => {
	return (
		<EthersProvider>
			<HashRouter>
				<Switch>
					<Route path="/" exact component={PageGovern} />
					<Route path="/trade" exact component={Page} />
				</Switch>
			</HashRouter>
		</EthersProvider>
	);
};

export default App;
