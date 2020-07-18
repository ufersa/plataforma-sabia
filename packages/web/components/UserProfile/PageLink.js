import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

const ROOT_PATH = '/user/my-account';

const PageLink = ({ href, children, onClick }) => (
	<Link href={`${ROOT_PATH}${href}`}>
		<SectionLink onClick={onClick}>{children}</SectionLink>
	</Link>
);

PageLink.propTypes = {
	href: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
};

PageLink.defaultProps = {
	onClick: () => {},
};

export const SectionLink = styled.a`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		font-size: 1.6rem;
		margin-bottom: 2rem;
		color: ${colors.secondary};

		:hover {
			color: ${colors.darkGreen};
		}

		svg {
			fill: ${colors.secondary};
			stroke: ${colors.secondary};
			width: 2rem;
			height: 2rem;
			margin-right: 1rem;
		}
	`};
`;

export default PageLink;
