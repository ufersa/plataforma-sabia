/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import { useTranslation } from 'react-i18next';

import { FiSearch } from 'react-icons/fi';
import { Button } from '../Button';
import CustomHighlight from './customHighlight';
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
											timeSpentMS,
										});
									} else if (!nbHits && timeSpentMS) {
										msg = t('search:termNotFound');
									}
									return msg;
								},
							}}
						/>
						<div {...containerProps}>{children}</div>
					</>
				)}
				renderInputComponent={(inputProps) => (
					<InputWrapper>
						<FiSearch fontSize={26} />
						<input {...inputProps} />
					</InputWrapper>
				)}
			/>
			<Button variant="success" type="submit">
				Pesquisar
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
		box-shadow: -4px 4px 24px rgba(0, 0, 0, 0.5);
		border: none;
		border-radius: ${metrics.baseRadius}rem;
		background-color: ${colors.white};
		width: 100%;
		z-index: 100;

		padding: 2.4rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;

		.react-autosuggest__container {
			flex-grow: 1;
			margin-right: 2.4rem;

			input {
				width: 100%;
				font-size: 1.4rem;
				line-height: 2.4rem;
				color: ${colors.black};
				border: none;
				background: transparent;
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
			font-size: 1.4rem;
			font-weight: bold;
			line-height: 2.4rem;
			padding: 1rem 3.4rem;

			svg {
				height: 2.4rem;
				width: 2.4rem;
			}
		}

		@media (max-width: ${screens.medium}px) {
			flex-direction: column;
			justify-content: space-between;
			align-items: stretch;
			padding: 2rem;

			button {
				font-size: 1.4rem;
				padding: 1.4rem 6rem;
				align-self: unset;
			}

			.react-autosuggest__container {
				margin-right: 0;
				margin-bottom: 1rem;

				input {
					font-size: 1.4rem;
				}
			}
		}
	`}
`;

const InputWrapper = styled.div`
	${({ theme: { colors, metrics, screens } }) => css`
		display: flex;
		align-items: center;

		border: 0.1rem solid ${colors.gray98};
		border-radius: ${metrics.baseRadius}rem;
		background-color: ${colors.gray98};

		padding: 0.8rem 1.2rem;

		> svg {
			color: ${colors.secondary};
			margin-right: 0.8rem;
		}

		@media (max-width: ${screens.medium}px) {
			font-size: 1.4rem;
			padding: 1.4rem 2rem;
		}
	`}
`;

export default connectAutoComplete(SearchBox);
