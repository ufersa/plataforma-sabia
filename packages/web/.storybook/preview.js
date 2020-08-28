import React from 'react';
import Router from 'next/router';
import {RouterContext} from 'next/dist/next-server/lib/router-context';
import {ThemeProvider, GlobalStyle} from '../styles';
import {ModalProvider} from '../components/Modal';
import {UserProvider} from '../components/User';

const actionWithPromise = () => (new Promise((resolve, _) => resolve(`Storybook`)));

const mockRouter = {
	push: () => {},
	pathname: '/',
	prefetch: actionWithPromise,
};

Router.router = mockRouter;

export const decorators = [(Story) => (
	<ThemeProvider>
		<GlobalStyle />
		<UserProvider>
			<ModalProvider>
				<RouterContext.Provider value={mockRouter}>
					<Story />
				</RouterContext.Provider>
      </ModalProvider>
		</UserProvider>
	</ThemeProvider>
)];
