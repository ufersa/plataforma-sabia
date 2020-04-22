import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';

import { LoginPage, ForgotPassword, ResetPassword } from './components/Auth';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/auth/forgot-password" component={ForgotPassword} />
				<Route
					path="/auth/reset-password"
					render={({ location }) => <ResetPassword location={location} />}
				/>
				<Route path="/">
					<Admin
						loginPage={LoginPage}
						authProvider={authProvider}
						dataProvider={dataProvider}>
						<Resource name="users" list={ListGuesser} />
						<Resource name="posts" list={ListGuesser} />
					</Admin>
				</Route>
			</Switch>
		</Router>
	);
};
export default App;
