import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

const Link = ({ children, href, passHref, ...rest }) => {
	return (
		<NextLink href={href} passHref={passHref} {...rest}>
			<a>{children}</a>
		</NextLink>
	);
};

Link.propTypes = {
	children: PropTypes.node.isRequired,
	href: PropTypes.string.isRequired,
	passHref: PropTypes.bool,
};

Link.defaultProps = {
	passHref: true,
};

export default Link;
