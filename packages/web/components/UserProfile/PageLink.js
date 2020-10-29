import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

const ROOT_PATH = '/user/my-account';

const PageLink = ({ active, href, children, onClick }) => (
	<Link href={`${ROOT_PATH}${href}`}>
		<SectionLink active={active} onClick={onClick}>
			{children}
		</SectionLink>
	</Link>
);

PageLink.propTypes = {
	href: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
};

PageLink.defaultProps = {
	onClick: () => {},
};

const SectionLink = styled.a`
	${({ theme: { colors }, active }) => css`
		display: flex;
		align-items: center;
		font-size: 1.6rem;
		margin-bottom: 2rem;
		color: ${colors.lightGray};
		padding-left: 2rem;

		${active && 'font-weight: bold;'} :hover {
			color: ${colors.darkGreen};
		}

		svg {
			fill: ${colors.lightGray};
			stroke: ${colors.lightGray};
			width: 2rem;
			height: 2rem;
			margin-right: 1rem;
		}
	`};
`;

export default PageLink;
