import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PageComingSoon from './Page/PageComingSoon';
import PageHome from './Page/PageHome';

const App = () => (
	<Router>
		<Switch>
			<Route path="/">
				<PageComingSoon />
			</Route>
			<Route path="/very-secret-page">
				<PageHome />
			</Route>
		</Switch>
	</Router>

);

export default App;
