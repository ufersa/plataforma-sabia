import styled from 'styled-components';
import { Button } from '../Header/styles';

export const StyledForm = styled.form`
	margin: 1rem auto;
	max-width: 40rem;
	padding: 2rem 1rem;

	button,
	a {
		padding-right: 3rem;
		padding-left: 3rem;
	}

	label {
		width: 100%;
		display: block;
		font-weight: 700;
		font-size: 1.7rem;
	}
`;

export const StyledInput = styled.input`
	width: 100%;
	height: 5rem;
	font: 1.2em sans-serif;
	margin: 0.5rem 0;
	padding: 1rem;
	background: none;
	border: 1px solid ${({ theme }) => theme.colors.mediumGray};
	color: ${({ theme }) => theme.colors.mediumGray};
`;

export const StyledButton = styled(Button)`
	margin-top: 0.5rem;
`;

export const Actions = styled.div`
	display: flex;
	justify-content: flex-end;

	a[href] {
		align-self: center;
		padding: 0 1rem;
	}
`;
