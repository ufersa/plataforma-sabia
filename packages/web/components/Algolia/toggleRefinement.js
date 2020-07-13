import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ToggleRefinement as AlgoliaToggleRefinement } from 'react-instantsearch-dom';

const ToggleRefinement = ({ attribute, label, value }) => (
	<StyledToggleRefinement attribute={attribute} label={label} value={value} />
);

ToggleRefinement.propTypes = {
	attribute: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
};

const StyledToggleRefinement = styled(AlgoliaToggleRefinement)`
	.ais-ToggleRefinement {
		&-label {
			display: flex;
			align-items: center;
		}

		&-checkbox {
			appearance: none;
			border: 0.1rem solid ${({ theme }) => theme.colors.secondary};
			background-color: ${({ theme }) => theme.colors.white};
			border-radius: ${({ theme }) => theme.metrics.smallRadius}rem;
			height: 2rem;
			min-width: 2rem;
			margin-right: 2rem;
			cursor: pointer;

			&:checked {
				background-color: ${({ theme }) => theme.colors.secondary};
			}

			::after {
				align-items: center;
				background: none;
				content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='12' height='9'%3E%3Cdefs%3E%3Cpath id='a' d='M0 0h24v24H0z'/%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd' transform='translate(-6 -8)'%3E%3Cmask id='b' fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cpath fill='%23fff' fill-rule='nonzero' d='M16.5 8.5L18 10l-6.99 7-4.51-4.5L8 11l3.01 3z' mask='url(%23b)'/%3E%3C/g%3E%3C/svg%3E");
				display: flex;
				height: 100%;
				justify-content: center;
				left: initial;
				position: relative;
				top: initial;
				transform: initial;
				width: initial;
		}

		&-labelText {
			font-size: 1.8rem;
			margin-right: 1.5rem;
			color: ${({ theme }) => theme.colors.darkGray};
		}
	}
`;

export default ToggleRefinement;
