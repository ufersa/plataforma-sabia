import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SearchBox as AlgoliaSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ placeholder, submitTitle, onChange, onSubmit }) => (
	<StyledSearchBox
		translations={{
			placeholder,
			submitTitle,
		}}
		onChange={onChange}
		onSubmit={onSubmit}
	/>
);

SearchBox.propTypes = {
	placeholder: PropTypes.string,
	submitTitle: PropTypes.string,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
};

SearchBox.defaultProps = {
	placeholder: 'Qual solução você busca?',
	submitTitle: 'Submeta sua consulta',
	onChange: () => {},
	onSubmit: () => {},
};

const StyledSearchBox = styled(AlgoliaSearchBox)`
	box-shadow: 0 0 9rem -1.5rem ${({ theme }) => theme.colors.darkWhite};
	border: none;
	border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;
	z-index: 100;

	.ais-SearchBox {
		&-form {
			padding: 3rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
		}

		&-input {
			flex-grow: 1;
			padding: 1.8rem 2rem;
			margin-right: 3rem;
			border: 0.1rem solid ${({ theme }) => theme.colors.gray98};
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			background-color: ${({ theme }) => theme.colors.gray98};
			font-size: 2rem;
			line-height: 1.9rem;
			color: ${({ theme }) => theme.colors.black};
		}

		&-submit {
			background-color: ${({ theme }) => theme.colors.primary};
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			border: none;
			font-size: 2.2rem;
			padding: 1.8rem 4rem;
			display: inline-block;

			:hover {
				opacity: 0.8;
			}
		}

		&-submitIcon {
			fill: ${({ theme }) => theme.colors.white};
			stroke: ${({ theme }) => theme.colors.white};
			width: ${({ theme }) => theme.sizes.smallIcon}rem;
			height: ${({ theme }) => theme.sizes.smallIcon}rem;
		}

		&-reset {
			display: none;
		}

		@media (max-width: ${({ theme }) => theme.screens.medium}px) {
			&-form {
				flex-direction: column;
				justify-content: space-between;
				align-items: stretch;
				padding: 2rem;
			}

			&-input {
				margin-right: 0;
				margin-bottom: 1rem;
			}
		}
	}
`;

export default SearchBox;
