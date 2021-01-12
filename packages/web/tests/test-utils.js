import { render } from '@testing-library/react';
import React from 'react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';
import { ThemeProvider, GlobalStyle } from '../styles';

export const routerMock = {
	basePath: '',
	pathname: '/',
	route: '/',
	asPath: '/',
	query: {},
	push: jest.fn().mockResolvedValue(true),
	replace: jest.fn().mockResolvedValue(true),
	reload: jest.fn(),
	back: jest.fn(),
	prefetch: jest.fn().mockResolvedValue(undefined),
	beforePopState: jest.fn(),
	events: {
		on: jest.fn(),
		off: jest.fn(),
		emit: jest.fn(),
	},
	isFallback: false,
};

// eslint-disable-next-line react/prop-types
const AllProviders = ({ children }) => {
	return (
		<ThemeProvider>
			<GlobalStyle />
			<UserProvider>
				<ModalProvider>
					<RouterContext.Provider value={routerMock}>{children}</RouterContext.Provider>
				</ModalProvider>
			</UserProvider>
		</ThemeProvider>
	);
};

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options });
// re-export everything
export * from '@testing-library/react';
export { customRender as render };
