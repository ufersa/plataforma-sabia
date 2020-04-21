import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles';
import GlobalStyle from '../styles/global';

const ThemeDecorator = (storyFn) => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		{storyFn()}
	</ThemeProvider>
);

export default ThemeDecorator;
