import { render } from '@testing-library/react';
import React from 'react';

import { UserProvider } from '@sabia/core';
import { ModalProvider } from '../components/Modal';
import { ThemeProvider } from '../styles';

// eslint-disable-next-line react/prop-types
const AllProviders = ({ children }) => {
	return (
		<ThemeProvider>
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
