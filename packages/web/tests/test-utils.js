import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../styles';
import { ModalProvider } from '../components/Modal';

// eslint-disable-next-line react/prop-types
const AllProviders = ({ children }) => {
	return (
		<ThemeProvider>
			<ModalProvider>{children}</ModalProvider>
		</ThemeProvider>
	);
};

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options });
// re-export everything
export * from '@testing-library/react';

export { customRender as render };
