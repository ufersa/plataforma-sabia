import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatMoney } from '../utils';

export const TechnologyContext = React.createContext({});

export const TechnologyProvider = ({ children, technology }) => {
	const implementationCosts = useMemo(() => {
		const costs = technology?.technologyCosts?.costs?.implementation_costs;

		const total = costs?.reduce((acc, item) => acc + item?.quantity * item?.value, 0);

		return total ? formatMoney(total) : 0;
	}, [technology]);

	return (
		<TechnologyContext.Provider value={{ technology, implementationCosts }}>
			{children}
		</TechnologyContext.Provider>
	);
};

TechnologyProvider.propTypes = {
	children: PropTypes.node.isRequired,
	technology: PropTypes.shape({}),
};

TechnologyProvider.defaultProps = {
	technology: {},
};

export default TechnologyProvider;
