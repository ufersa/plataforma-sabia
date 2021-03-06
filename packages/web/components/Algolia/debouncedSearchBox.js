import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import SearchBoxBackground from './Common/SearchBoxBackground';

const DebouncedSearchBox = ({
	placeholder,
	submitTitle,
	currentRefinement,
	refine,
	delay,
	secondary,
}) => {
	let timerId = null;

	const onChangeDebounced = (event) => {
		const { value } = event.currentTarget;

		clearTimeout(timerId);
		timerId = setTimeout(() => refine(value), delay);
	};

	const onSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<SearchBoxBackground secondary={secondary}>
			<Form
				className="ais-SearchBox-form"
				noValidate
				onSubmit={onSubmit}
				secondary={secondary}
			>
				<InputWrapper>
					<input
						className="ais-SearchBox-input"
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						placeholder={placeholder}
						spellCheck="false"
						type="search"
						defaultValue={currentRefinement}
						onChange={onChangeDebounced}
					/>
					<Button aria-label="Submit search" type="submit">
						<AiOutlineSearch />
						{submitTitle}
					</Button>
				</InputWrapper>
			</Form>
		</SearchBoxBackground>
	);
};

DebouncedSearchBox.propTypes = {
	placeholder: PropTypes.string,
	submitTitle: PropTypes.string,
	currentRefinement: PropTypes.string.isRequired,
	refine: PropTypes.func.isRequired,
	delay: PropTypes.number,
	secondary: PropTypes.bool,
};

DebouncedSearchBox.defaultProps = {
	placeholder: 'Qual solução você busca?',
	submitTitle: 'Pesquisar',
	delay: 500,
	secondary: false,
};

const Form = styled.form`
	${({ theme: { colors, metrics, screens }, secondary }) => css`
		background-color: rgba(29, 29, 29, 0.1);
		border: none;
		border-radius: ${metrics.baseRadius}rem;
		width: 100%;
		z-index: 100;

		position: relative;

		display: flex;
		align-items: center;

		@media screen and (max-width: ${screens.large}px) {
			margin: 0.8rem 0 1.6rem 0;
		}

		.ais-Highlight-highlighted {
			background-color: ${colors.primary};
		}

		${!secondary &&
			css`
				max-width: 58rem;
				padding: 0.8rem;
			`}
	`}
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
		width: 100%;

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

export default connectSearchBox(DebouncedSearchBox);
