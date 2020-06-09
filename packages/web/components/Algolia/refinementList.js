import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RefinementList as AlgoliaRefinementList } from 'react-instantsearch-dom';
import { normalize } from '../../utils/helper';

const sortItems = (items) =>
	items.sort((a, b) => {
		const nameA = normalize(a.label).toLowerCase();
		const nameB = normalize(b.label).toLowerCase();
		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});

const RefinementList = ({ attribute, limit, searchable, placeholder, noResults, operator }) => (
	<StyledRefinementList
		attribute={attribute}
		limit={limit}
		searchable={searchable}
		translations={{ placeholder, noResults }}
		operator={operator}
		transformItems={sortItems}
	/>
);

RefinementList.propTypes = {
	attribute: PropTypes.string.isRequired,
	limit: PropTypes.number,
	searchable: PropTypes.bool,
	placeholder: PropTypes.string,
	noResults: PropTypes.string,
	operator: PropTypes.oneOf(['or', 'and']),
};

RefinementList.defaultProps = {
	limit: 20,
	searchable: true,
	placeholder: 'Busque aqui...',
	noResults: 'Nenhum resultado',
	operator: 'or',
};

const StyledRefinementList = styled(AlgoliaRefinementList)`
	.ais-SearchBox {
		&-input {
			min-height: 4rem;
			width: 100%;
			padding: 1.5rem 2rem;
			border: 0.1rem solid ${({ theme }) => theme.colors.gray98};
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			background-color: ${({ theme }) => theme.colors.gray98};
			color: ${({ theme }) => theme.colors.black};
			font-weight: 400;
			font-size: 1.4rem;
		}

		&-submit,
		&-reset {
			display: none;
		}
	}

	.ais-RefinementList {
		&-list {
			min-height: 22rem;
		}

		&-item {
			margin-top: 2rem;
			cursor: pointer;
		}

		&-label {
			display: flex;
			align-items: center;
		}

		&-labelText {
			font-size: 1.8rem;
			margin-right: 1.5rem;
			color: ${({ theme }) => theme.colors.darkGray};
		}

		&-checkbox {
			border: 0.1rem solid ${({ theme }) => theme.colors.gray98};
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			height: 2rem;
			width: 2rem;
			margin-right: 2rem;
		}

		&-count {
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			background-color: ${({ theme }) => theme.colors.gray98};
			color: ${({ theme }) => theme.colors.black};
			font-size: 1.3rem;
			padding: 0.2rem 0.5rem;
			font-weight: 500;
		}
	}
`;

export default RefinementList;
