import React from 'react';
import { ThemeProvider, GlobalStyle } from '../styles';
import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';

const ThemeDecorator = (storyFn) => (
	<ThemeProvider>
		<GlobalStyle />
		<UserProvider>
			<ModalProvider>{storyFn()}</ModalProvider>
		</UserProvider>
	</ThemeProvider>
);

export default ThemeDecorator;
