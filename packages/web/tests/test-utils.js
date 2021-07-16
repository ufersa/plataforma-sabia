import { render } from '@testing-library/react';
import React from 'react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import I18nProvider from 'next-translate/I18nProvider';
import { SWRConfig } from 'swr';

import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';
import { ShoppingCartProvider } from '../components/ShoppingCart';
import { ThemeProvider, GlobalStyle } from '../styles';
import * as ptTranslations from '../public/static/locales/pt';

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
	locale: 'pt',
};

// eslint-disable-next-line react/prop-types
const AllProviders = ({ children }) => {
	return (
		<SWRConfig value={{ dedupingInterval: 0 }}>
			<I18nProvider lang="pt" namespaces={{ ...ptTranslations }}>
				<ThemeProvider>
					<GlobalStyle />
					<UserProvider>
						<ModalProvider>
							<ShoppingCartProvider>
								<RouterContext.Provider value={routerMock}>
									{children}
								</RouterContext.Provider>
							</ShoppingCartProvider>
						</ModalProvider>
					</UserProvider>
				</ThemeProvider>
			</I18nProvider>
		</SWRConfig>
	);
};

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options });
// re-export everything
export * from '@testing-library/react';
export { customRender as render };
