import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageComingSoon from './Page/PageComingSoon';

const App = () => (
	<Router>
		<Switch>
			<Route path="/">
				<PageComingSoon />
			</Route>
		</Switch>
	</Router>
);

export default App;
