import React from 'react';
import { AlgoliaSearchProvider, ThemeProvider } from '../providers';
import GlobalStyle from '../styles/global';

const ThemeDecorator = (storyFn) => (
	<AlgoliaSearchProvider>
		<ThemeProvider>
			<GlobalStyle />
			{storyFn()}
		</ThemeProvider>
	</AlgoliaSearchProvider>
);

export default ThemeDecorator;
