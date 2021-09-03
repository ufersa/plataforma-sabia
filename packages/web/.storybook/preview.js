import React from 'react';
import Router from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ThemeProvider, GlobalStyle } from '../styles';
import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';

const actionWithPromise = () => new Promise((resolve) => resolve('Storybook'));

const mockRouter = {
	push: () => {},
	pathname: '/',
	prefetch: actionWithPromise,
};

Router.router = mockRouter;

// eslint-disable-next-line import/prefer-default-export
export const decorators = [
	(Story) => (
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
	),
];
