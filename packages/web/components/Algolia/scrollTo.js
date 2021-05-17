import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connectScrollTo } from 'react-instantsearch-dom';

const ScrollTo = ({ alignToTop, children, hasNotChanged }) => {
	const ref = useRef();

	useEffect(() => {
		if (hasNotChanged) ref.current.scrollIntoView(alignToTop);
	}, [hasNotChanged, alignToTop]);

	return <div ref={ref}>{children}</div>;
};

ScrollTo.propTypes = {
	alignToTop: PropTypes.bool,
	children: PropTypes.element,
	hasNotChanged: PropTypes.bool.isRequired,
};

ScrollTo.defaultProps = {
	alignToTop: true,
	children: <></>,
};

export default connectScrollTo(ScrollTo);
