import React from 'react';
import { ThemeProvider } from '../providers';
import GlobalStyle from '../styles/global';
import { ModalProvider } from '../components/Modal';

const ThemeDecorator = (storyFn) => (
	<ThemeProvider>
		<GlobalStyle />
		<ModalProvider>{storyFn()}</ModalProvider>
	</ThemeProvider>
);

export default ThemeDecorator;
