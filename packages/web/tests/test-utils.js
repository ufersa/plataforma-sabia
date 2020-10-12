import { render } from '@testing-library/react';
import React from 'react';

import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';
import { ThemeProvider, GlobalStyle } from '../styles';

// eslint-disable-next-line react/prop-types
const AllProviders = ({ children }) => {
	return (
		<ThemeProvider>
			<GlobalStyle />
			<UserProvider>
				<ModalProvider>{children}</ModalProvider>
			</UserProvider>
		</ThemeProvider>
	);
};

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options });
// re-export everything
export * from '@testing-library/react';
export { customRender as render };
