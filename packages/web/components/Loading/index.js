import React from 'react';
import PropTypes from 'prop-types';

import { Container, Loader } from './styles';

const Loading = ({ variant }) => {
	return (
		<Container>
			<Loader variant={variant} />
		</Container>
	);
};

Loading.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary', 'white']),
};

Loading.defaultProps = {
	variant: 'primary',
};

export default Loading;
