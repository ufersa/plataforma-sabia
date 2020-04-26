import styled from 'styled-components';

export const StyledForm = styled.form`
	margin: 1rem auto;
	padding: 2rem 1rem;
	width: 100%;
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
	border-radius: 0.5rem;
	color: ${({ theme }) => theme.colors.mediumGray};
`;

export const Actions = styled.div`
	display: flex;
	justify-content: flex-end;

	a[href] {
		align-self: center;
		padding: 0 1rem;
	}

	button {
		margin-top: 0.5rem;
	}
`;
