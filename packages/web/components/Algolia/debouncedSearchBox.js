import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-dom';

const DebouncedSearchBox = ({
	placeholder,
	submitTitle,
	onSubmit,
	currentRefinement,
	refine,
	delay,
}) => {
	let timerId = null;

	const [state, setState] = useState(currentRefinement);

	const onChangeDebounced = (event) => {
		const { value } = event.currentTarget;

		clearTimeout(timerId);
		timerId = setTimeout(() => refine(value), delay);

		setState(value);
	};

	return (
		<SearchBox ais-SearchBox>
			<Form className="ais-SearchBox-form" noValidate onSubmit={onSubmit}>
				<Input
					className="ais-SearchBox-input"
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					placeholder={placeholder}
					spellCheck="false"
					maxLength="512"
					type="search"
					value={state}
					onChange={onChangeDebounced}
				/>
				<Button className="ais-SearchBox-submit" type="submit" title={submitTitle}>
					<svg
						className="ais-SearchBox-submitIcon"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 40 40"
					>
						<path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z" />
					</svg>
				</Button>
			</Form>
		</SearchBox>
	);
};

DebouncedSearchBox.propTypes = {
	placeholder: PropTypes.string,
	submitTitle: PropTypes.string,
	onSubmit: PropTypes.func,
	currentRefinement: PropTypes.string.isRequired,
	refine: PropTypes.func.isRequired,
	delay: PropTypes.number,
};

DebouncedSearchBox.defaultProps = {
	placeholder: 'Qual solução você busca?',
	submitTitle: 'Submeta sua consulta',
	onSubmit: () => {},
	delay: 800,
};

const SearchBox = styled.div`
	box-shadow: 0 0 9rem -1.5rem ${({ theme }) => theme.colors.darkWhite};
	border: none;
	border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;
	z-index: 100;
`;

const Form = styled.form`
	padding: 3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		padding: 2rem;
	}
`;

const Input = styled.input`
	flex-grow: 1;
	padding: 1.8rem 2rem;
	margin-right: 3rem;
	border: 0.1rem solid ${({ theme }) => theme.colors.gray98};
	border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	background-color: ${({ theme }) => theme.colors.gray98};
	font-size: 2rem;
	line-height: 1.9rem;
	color: ${({ theme }) => theme.colors.black};

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		margin-right: 0;
		margin-bottom: 1rem;
	}
`;

const Button = styled.button`
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	border: none;
	font-size: 2.2rem;
	padding: 1.8rem 4rem;
	display: inline-block;

	:hover {
		opacity: 0.8;
	}

	.ais-SearchBox-submitIcon {
		fill: ${({ theme }) => theme.colors.white};
		stroke: ${({ theme }) => theme.colors.white};
		width: ${({ theme }) => theme.sizes.smallIcon}rem;
		height: ${({ theme }) => theme.sizes.smallIcon}rem;
	}
`;

export default connectSearchBox(DebouncedSearchBox);
