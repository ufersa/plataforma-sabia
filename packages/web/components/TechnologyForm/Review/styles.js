import styled from 'styled-components';
import * as Layout from '../../Common/Layout';
import { CheckBoxField } from '../../Form';

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

export const Wrapper = styled.div`
	margin-bottom: 4rem;
`;

export const Checkbox = styled(CheckBoxField)`
	div {
		text-transform: uppercase !important;
		a {
			border: 1px solid red;
			padding: 0;
		}
	}
`;
