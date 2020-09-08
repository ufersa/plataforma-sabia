import React from 'react';
import { UserProvider } from '@sabia/core';
import { ThemeProvider, GlobalStyle } from '../styles';
import { ModalProvider } from '../components/Modal';

const ThemeDecorator = (storyFn) => (
	<ThemeProvider>
		<GlobalStyle />
		<UserProvider>
			<ModalProvider>{storyFn()}</ModalProvider>
		</UserProvider>
	</ThemeProvider>
);

export default ThemeDecorator;
