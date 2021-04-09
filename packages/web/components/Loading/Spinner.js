import React from 'react';
import PropTypes from 'prop-types';

import { Container, Loader } from './styles';

const Spinner = ({ variant, noPadding }) => (
	<Container noPadding={noPadding}>
		<Loader variant={variant} />
	</Container>
);

Spinner.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary', 'white']),
	noPadding: PropTypes.bool,
};

Spinner.defaultProps = {
	variant: 'primary',
	noPadding: false,
};

export default Spinner;
