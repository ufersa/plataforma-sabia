import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { HiddenWrapper } from './styles';

const Wrapper = ({ loading, variant, children, alwaysRenderChildren }) => {
	const spinnerComponent = createElement(Spinner, { variant });

	if (alwaysRenderChildren) {
		return (
			<>
				{loading && spinnerComponent}
				<HiddenWrapper active={loading}>{children}</HiddenWrapper>
			</>
		);
	}

	return loading ? spinnerComponent : children;
};

Wrapper.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf(['primary', 'secondary', 'white']),
	alwaysRenderChildren: PropTypes.bool,
};

Wrapper.defaultProps = {
	loading: true,
	variant: 'primary',
	alwaysRenderChildren: false,
};

export default Wrapper;
