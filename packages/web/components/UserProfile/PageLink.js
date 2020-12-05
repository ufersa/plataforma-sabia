import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

const ROOT_PATH = '/user/my-account';

const PageLink = ({ active, href, notification, children, onClick }) => (
	<Link href={`${ROOT_PATH}${href}`}>
		<SectionLink active={active} onClick={onClick}>
			{children}
			{notification && <SectionBadge>{notification}</SectionBadge>}
		</SectionLink>
	</Link>
);

PageLink.propTypes = {
	href: PropTypes.string.isRequired,
	active: PropTypes.bool,
	notification: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
};

PageLink.defaultProps = {
	onClick: () => {},
	active: false,
	notification: null,
};

const SectionLink = styled.a`
	${({ theme: { colors }, active }) => css`
		display: flex;
		align-items: center;
		font-size: 1.4rem;
		font-weight: 500;
		margin-bottom: 2rem;
		color: ${colors.lightGray2};
		padding-left: 2rem;

		svg {
			stroke: ${colors.lightGray2};
			width: 2rem;
			height: 2rem;
			margin-right: 1rem;
		}

		:hover {
			color: ${colors.darkGreen};
		}

		${active &&
			css`
				font-weight: bold;
				color: ${colors.secondary};

				svg {
					stroke: ${colors.secondary};
					stroke-width: 2.5;
				}
			`}
	`};
`;

const SectionBadge = styled.span`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 0.8rem;
		font-weight: bold;
		line-height: 1.2rem;
		margin-left: 0.8rem;
		padding: 0.4rem;
		color: ${colors.white};
		background-color: ${colors.secondary};
		border-radius: 1rem;
	`};
`;

export default PageLink;
