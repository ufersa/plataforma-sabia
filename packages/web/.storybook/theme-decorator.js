import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles';
import GlobalStyle from '../styles/global';
import { ModalProvider } from '../components/Modal';

const ThemeDecorator = (storyFn) => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<ModalProvider>{storyFn()}</ModalProvider>
	</ThemeProvider>
);

export default ThemeDecorator;
