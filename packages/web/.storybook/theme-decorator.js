import React from 'react';
import { ThemeProvider, GlobalStyle } from '../styles';
import { ModalProvider } from '../components/Modal';

const ThemeDecorator = (storyFn) => (
	<ThemeProvider>
		<GlobalStyle />
		<ModalProvider>{storyFn()}</ModalProvider>
	</ThemeProvider>
);

export default ThemeDecorator;
