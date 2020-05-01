import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles';
import GlobalStyle from '../styles/global';
import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';

const ThemeDecorator = (storyFn) => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<UserProvider>
			<ModalProvider>{storyFn()}</ModalProvider>
		</UserProvider>
	</ThemeProvider>
);

export default ThemeDecorator;
