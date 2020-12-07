import React from 'react';
import { Page } from './page';
import { EthersProvider } from '../app';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import Page2 from './page/Page2';
import Page3 from './page/Page3';

const App = () => {
	return (
		<EthersProvider>
			<HashRouter>
				<Switch>
					<Route path="/page3" exact component={Page3} />
					<Route path="/page2" exact component={Page2} />
					<Route path="/" exact component={Page} />
				</Switch>
			</HashRouter>
		</EthersProvider>
	);
};

export default App;
