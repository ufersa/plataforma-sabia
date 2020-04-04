import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import authProvider from './authProvider';
import dataProvider from './dataProvider';

import LoginPage from './LoginPage';

const App = () => (
	<Admin loginPage={LoginPage} authProvider={authProvider} dataProvider={dataProvider}>
		<Resource name="users" list={ListGuesser} />
		<Resource name="posts" list={ListGuesser} />
	</Admin>
);
export default App;
