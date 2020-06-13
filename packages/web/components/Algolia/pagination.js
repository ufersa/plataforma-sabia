import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Pagination as AlgoliaPagination } from 'react-instantsearch-dom';

const Pagination = ({ showFirst, showLast }) => (
	<StyledPagination showFirst={showFirst} showLast={showLast} />
);

Pagination.propTypes = {
	showFirst: PropTypes.bool,
	showLast: PropTypes.bool,
};

Pagination.defaultProps = {
	showFirst: false,
	showLast: false,
};

const StyledPagination = styled(AlgoliaPagination)`
	font-size: 1.6rem;

	.ais-Pagination-list {
		display: flex;
		justify-content: center;

		li:not(:first-child) {
			margin-left: 0.4rem;
		}

		li:not(:last-child) {
			margin-right: 0.4rem;
		}
	}

	.ais-Pagination-item {
		height: 5rem;
		width: 5rem;

		&--disabled {
			opacity: 0.33;
		}
	}

	.ais-Pagination-link {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
		height: 100%;
		width: 100%;
		background-color: ${({ theme }) => theme.colors.gray98};
		color: ${({ theme }) => theme.colors.black};

		&--selected {
			background-color: ${({ theme }) => theme.colors.primary};
			color: ${({ theme }) => theme.colors.white};
		}
	}
`;

export default Pagination;
