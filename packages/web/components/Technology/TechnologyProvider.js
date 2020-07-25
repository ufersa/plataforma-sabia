import React from 'react';
import PropTypes from 'prop-types';
import TechnologyContext from './TechnologyContext';

export const TechnologyProvider = ({ children, technology }) => (
	<TechnologyContext.Provider value={{ technology }}>{children}</TechnologyContext.Provider>
);

TechnologyProvider.propTypes = {
	children: PropTypes.node.isRequired,
	technology: PropTypes.shape({}),
};

TechnologyProvider.defaultProps = {
	technology: {},
};

export default TechnologyProvider;
