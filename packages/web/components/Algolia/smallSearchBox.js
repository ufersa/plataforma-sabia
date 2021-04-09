/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import { AiOutlineSearch } from 'react-icons/ai';
import CustomHighlight from './customHighlight';
import { StyledStats } from '../Hero/HeroSearch/styles';
import SearchBoxBackground from './Common/SearchBoxBackground';

const SearchBox = ({ placeholder, onChange, onSubmit, currentRefinement, refine, hits }) => {
	const [inputValue, setInputValue] = useState(currentRefinement);

	const handleChange = (_, { newValue }) => {
		setInputValue(newValue);
		onChange(newValue);
	};

	const onSuggestionsFetchRequested = ({ value }) => refine(value);

	const onSuggestionsClearRequested = () => refine();

	const getSuggestionValue = (hit) => hit.query;

	const renderSuggestion = (hit) => (
		<CustomHighlight attribute="query" hit={hit} tagName="mark" />
	);

	return (
		<SearchBoxBackground>
			<AutoSuggestWrapper onSubmit={onSubmit}>
				<AutoSuggest
					suggestions={hits}
					onSuggestionsFetchRequested={onSuggestionsFetchRequested}
					onSuggestionsClearRequested={onSuggestionsClearRequested}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={{ placeholder, onChange: handleChange, value: inputValue }}
					renderSuggestionsContainer={({ containerProps, children }) => (
						<SuggestionContainer>
							<div {...containerProps}>{children}</div>
						</SuggestionContainer>
					)}
					renderInputComponent={(inputProps) => (
						<InputWrapper>
							<input {...inputProps} />
							<Button aria-label="Submit search" type="submit">
								<AiOutlineSearch />
								Pesquisar
							</Button>
						</InputWrapper>
					)}
				/>
			</AutoSuggestWrapper>
		</SearchBoxBackground>
	);
};

SearchBox.propTypes = {
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	currentRefinement: PropTypes.string.isRequired,
	refine: PropTypes.func.isRequired,
	hits: PropTypes.arrayOf(PropTypes.object),
};

SearchBox.defaultProps = {
	placeholder: 'Qual solução você busca?',
	onChange: () => {},
	onSubmit: () => {},
	hits: [],
};

export const AutoSuggestWrapper = styled.form`
	${({ theme: { colors, metrics, screens } }) => css`
		background-color: rgba(29, 29, 29, 0.1);
		max-width: 58rem;
		border: none;
		border-radius: ${metrics.baseRadius}rem;
		width: 100%;
		z-index: 100;

		position: relative;

		display: flex;
		align-items: center;
		padding: 0.8rem;

		.react-autosuggest__container {
			flex-grow: 1;
		}

		.react-autosuggest__suggestion {
			padding: 1.6rem;
			cursor: pointer;

			&.react-autosuggest__suggestion--highlighted {
				background-color: ${colors.gray98};
			}
		}

		.ais-Highlight-highlighted {
			background-color: ${colors.primary};
		}

		@media (max-width: ${screens.medium}px) {
			.react-autosuggest__container {
				margin-right: 0;
			}
		}
	`}
`;

const SuggestionContainer = styled.div`
	${({ theme: { colors, metrics } }) => css`
		overflow: hidden;
		position: absolute;
		background-color: ${colors.white};
		box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
			0px 3px 14px 2px rgba(0, 0, 0, 0.12);

		border-radius: ${metrics.baseRadius}rem;

		right: 0;
		left: 0;

		${StyledStats} {
			border-top-right-radius: ${metrics.baseRadius}rem;
			border-top-left-radius: ${metrics.baseRadius}rem;
		}
	`};
`;

const Button = styled.button`
	${({ theme: { colors } }) => css`
		background: none;
		border: none;
		outline: none;
		margin-right: 1.2rem;
		max-width: fit-content;

		display: flex;
		align-items: center;

		text-transform: uppercase;
		font-weight: bold;
		font-size: 1.4rem;
		line-height: 2.4rem;

		> svg {
			margin-right: 0.4rem;
		}

		color: ${colors.secondary};
		padding: 0.4rem 0.8rem;

		:hover:not(:disabled) {
			color: ${colors.white};
			background: ${colors.secondary};
		}

		:focus:not(:disabled) {
			box-shadow: 0px 0px 4px 2px ${colors.primary};
		}

		:disabled {
			pointer-events: none;
			opacity: 0.5;
		}
	`}
`;

const InputWrapper = styled.div`
	${({ theme: { colors, metrics } }) => css`
		background: ${colors.white};
		border: 0.1rem solid ${colors.gray98};
		border-radius: ${metrics.baseRadius}rem;

		display: flex;
		align-items: center;
		justify-content: center;

		input {
			width: 100%;
			padding: 1.2rem 1.6rem;
			font-size: 1.6rem;
			line-height: 1.9rem;
			color: ${colors.black};
			border: none;
		}
	`}
`;

export default connectAutoComplete(SearchBox);
