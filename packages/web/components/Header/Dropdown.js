import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Dropdown = ({ links }) => {
	return (
		<DropdownContainer className="dropdown" aria-label="submenu">
			{links.map((link) => (
				<li key={link.id || link.href}>
					<Link href={link.href}>
						<a
							target={link.external ? '_blank' : '_self'}
							rel={link.external ? 'noreferrer' : ''}
						>
							{link.label}
						</a>
					</Link>
				</li>
			))}
		</DropdownContainer>
	);
};

Dropdown.propTypes = {
	links: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			label: PropTypes.string,
			href: PropTypes.string,
			external: PropTypes.bool,
		}),
	).isRequired,
};

const DropdownContainer = styled.ul`
	${({ theme: { colors } }) => css`
		position: absolute;
		width: 22rem;
		left: calc(50% - 11rem);
		top: 100%;
		background: ${colors.secondary};
		padding: 2rem 1.5rem 0.8rem 1.5rem;
		box-shadow: 0 0 0.4rem ${colors.darkGray3};
		display: none;
		opacity: 0;
		visibility: hidden;

		a {
			color: ${colors.white} !important;
			margin-bottom: 12px;
			font-size: 1.2rem;
			line-height: 133%;
			font-weight: bold;
			padding: 0 !important;

			&:hover {
				color: ${colors.primary} !important;
			}
		}

		&::before {
			content: '';
			position: absolute;
			left: calc(50% - 1.6rem);
			top: -1.2rem;
			width: 0;
			height: 0;
			border-left: 1.6rem solid transparent;
			border-right: 1.6rem solid transparent;
			border-bottom: 1.6rem solid ${colors.secondary};
		}
	`}
`;

export default Dropdown;
