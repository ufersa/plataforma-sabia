/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { StyledLink } from './styles';

const Link = ({
	children,
	href,
	as,
	passHref,
	replace,
	scroll,
	hover,
	onClick,
	target,
	alignSelf,
	variant,
	color,
	...linkProps
}) => {
	return (
		<NextLink href={href} as={as} passHref={passHref} replace={replace} scroll={scroll}>
			<StyledLink
				onClick={onClick}
				hover={hover}
				target={target}
				alignSelf={alignSelf}
				variant={variant}
				color={color}
				{...linkProps}
			>
				{children}
			</StyledLink>
		</NextLink>
	);
};

Link.propTypes = {
	children: PropTypes.node.isRequired,
	href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	passHref: PropTypes.bool,
	replace: PropTypes.bool,
	scroll: PropTypes.bool,
	hover: PropTypes.bool,
	onClick: PropTypes.func,
	target: PropTypes.string,
	alignSelf: PropTypes.string,
	variant: PropTypes.string,
	color: PropTypes.string,
};

Link.defaultProps = {
	as: null,
	passHref: true,
	replace: false,
	scroll: true,
	hover: false,
	onClick: () => {},
	target: '_self',
	alignSelf: 'left',
	variant: 'bold',
	color: undefined,
};

export default Link;
