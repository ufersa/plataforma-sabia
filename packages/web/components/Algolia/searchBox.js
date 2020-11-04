/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import { AiOutlineSearch } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';
import { CustomHighlight } from '.';
import { StyledStats } from '../Hero/HeroSearch/styles';

const SearchBox = ({ placeholder, onChange, onSubmit, currentRefinement, refine, hits }) => {
	const [inputValue, setInputValue] = useState(currentRefinement);
	const { t } = useTranslation();

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
		<AutoSuggestWrapper onSubmit={onSubmit}>
			<AutoSuggest
				suggestions={hits}
				onSuggestionsFetchRequested={onSuggestionsFetchRequested}
				onSuggestionsClearRequested={onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={{ placeholder, onChange: handleChange, value: inputValue }}
				renderSuggestionsContainer={({ containerProps, children }) => (
					<>
						<StyledStats
							translations={{
								stats(nbHits, timeSpentMS) {
									let msg;
									if (inputValue.length > 2 && nbHits) {
										msg = t('search:foundTerms', {
											nbHits,
											termQuery: inputValue,
											timeSpentMS,
										});
									} else if (!nbHits && timeSpentMS) {
										msg = t('search:termNotFound', {
											termQuery: inputValue,
										});
									}
									return msg;
								},
							}}
						/>
						<div {...containerProps}>{children}</div>
					</>
				)}
			/>
			<Button aria-label="Submit search" type="submit">
				<AiOutlineSearch />
			</Button>
		</AutoSuggestWrapper>
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

const AutoSuggestWrapper = styled.form`
	${({ theme: { colors, metrics, screens } }) => css`
		box-shadow: 0 0 9rem -1.5rem ${colors.darkWhite};
		border: none;
		border-radius: ${metrics.baseRadius}rem;
		background-color: ${colors.white};
		width: 100%;
		z-index: 100;

		padding: 3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;

		.react-autosuggest__container {
			flex-grow: 1;
			margin-right: 3rem;
			input {
				width: 100%;
				padding: 1.5rem 2rem;
				border: 0.1rem solid ${colors.gray98};
				border-radius: ${metrics.baseRadius}rem;
				background-color: ${colors.gray98};
				font-size: 2.7rem;
				line-height: 1.9rem;
				color: ${colors.black};
			}
		}

		.react-autosuggest__suggestion {
			padding: 1rem 0;
			cursor: pointer;

			&.react-autosuggest__suggestion--highlighted {
				background-color: ${colors.gray98};
			}
		}

		.react-autosuggest__suggestions-container--open {
			margin-top: 1rem;
		}

		.ais-Highlight-highlighted {
			background-color: ${colors.primary};
		}

		button {
			align-self: baseline;
		}

		@media (max-width: ${screens.medium}px) {
			flex-direction: column;
			justify-content: space-between;
			align-items: stretch;
			padding: 2rem;

			button {
				font-size: 1.6rem;
				padding: 1.4rem 6rem;
				align-self: unset;
			}

			.react-autosuggest__container {
				margin-right: 0;
				margin-bottom: 1rem;

				input {
					font-size: 1.6rem;
					padding: 1.4rem 2rem;
				}
			}
		}
	`}
`;

export default connectAutoComplete(SearchBox);
