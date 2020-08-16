import styled from 'styled-components';
import * as Layout from '../../Common/Layout';

export const Cell = styled(Layout.Cell)`
	width: 100%;
`;

export const Row = styled.div`
	display: flex;
	align-items: flex-start;

	& > *:not(:first-child):not(:last-child) {
		margin: 0 10px;
	}

	@media (max-width: ${({ theme }) => theme.screens.large}px) {
		flex-direction: column;
		margin-top: 1.5rem;
	}
`;

export const Col = styled.div`
	flex: ${({ size }) => size || 1};

	@media (max-width: ${({ theme }) => theme.screens.small}px) {
		width: 100%;
	}
`;

export const Wrapper = styled.div`
	margin-bottom: 4rem;
`;

export const Label = styled.label`
	display: block;
	margin: 1rem 0;
	text-transform: uppercase;

	a {
		padding: 0;
	}

	input[type='checkbox'] {
		margin-right: 1rem;
	}
`;

export const Checkbox = styled.input.attrs(({ name }) => ({
	name,
	id: name,
	type: 'checkbox',
}))`
	background: blue;
	border: 1px solid red;
`;
