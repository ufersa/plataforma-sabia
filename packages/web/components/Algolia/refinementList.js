import React from 'react';
import styled, { css } from 'styled-components';
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

const RefinementList = ({
	attribute,
	limit,
	searchable,
	placeholder,
	noResults,
	operator,
	showMore,
	transformItems,
}) => (
	<StyledRefinementList
		attribute={attribute}
		limit={limit}
		searchable={searchable}
		translations={{ placeholder, noResults }}
		operator={operator}
		transformItems={(items) =>
			transformItems ? transformItems(sortItems(items)) : sortItems(items)
		}
		showMore={showMore}
	/>
);

RefinementList.propTypes = {
	attribute: PropTypes.string.isRequired,
	limit: PropTypes.number,
	searchable: PropTypes.bool,
	placeholder: PropTypes.string,
	noResults: PropTypes.string,
	operator: PropTypes.oneOf(['or', 'and']),
	showMore: PropTypes.bool,
	transformItems: PropTypes.func,
};

RefinementList.defaultProps = {
	limit: 20,
	searchable: true,
	placeholder: 'Busque aqui...',
	noResults: 'Nenhum resultado',
	operator: 'or',
	showMore: false,
	transformItems: null,
};

const StyledRefinementList = styled(AlgoliaRefinementList)`
	${({ theme: { colors, metrics } }) => css`
		.ais-SearchBox {
			&-input {
				min-height: 4rem;
				width: 100%;
				padding: 1.5rem 2rem;
				border: 0.1rem solid ${colors.mediumGray};
				border-radius: ${metrics.baseRadius}rem;
				background-color: ${colors.white};
				color: ${colors.black};
				font-weight: 400;
				font-size: 1.6rem;

				&::placeholder {
					color: ${colors.silver};
				}
			}

			&-submit,
			&-reset {
				display: none;
			}
		}

		.ais-RefinementList {
			&-item {
				margin-top: 2rem;
				cursor: pointer;
			}

			&-label {
				display: flex;
				align-items: center;
				cursor: pointer;
			}

			&-labelText {
				font-size: 1.2rem;
				line-height: 1.6rem;
				font-weight: 500;
				margin-right: 1.2rem;
				color: ${colors.darkGray};
			}

			&-count {
				color: ${colors.silver};
				font-size: 1.2rem;
				font-weight: 500;
			}

			&-checkbox {
				appearance: none;
				border: 0.1rem solid ${colors.secondary};
				background-color: ${colors.white};
				border-radius: ${metrics.smallRadius}rem;
				height: 2rem;
				min-width: 2rem;
				margin-right: 1.2rem;
				cursor: pointer;

				&:checked {
					background-color: ${colors.secondary};
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
			}

			&-count {
				border-radius: ${metrics.baseRadius}rem;
				background-color: ${colors.gray98};
				color: ${colors.black};
				font-size: 1.6rem;
				padding: 0.2rem 0.5rem;
				font-weight: 500;
			}
		}
	`}
`;

export default RefinementList;
