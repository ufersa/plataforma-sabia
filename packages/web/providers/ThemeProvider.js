import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '../styles';

const ThemeProvider = ({ children }) => (
	<StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
);

ThemeProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
};

export default ThemeProvider;
