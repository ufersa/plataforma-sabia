import styled from 'styled-components';

export const StyledForm = styled.form`
	margin: 0 auto;
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
	${(props) => (props.icon ? 'border-left:none;' : '')}
`;

export const Actions = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font: 1.2em sans-serif;
`;

export const ContentInput = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
`;

export const Styledicon = styled.div`
	height: 5rem;
	width: 6rem;
	padding: 0.5rem;
	margin-top: 0.5rem;
	margin-right: -1rem;
	border: 1px solid ${({ theme }) => theme.colors.mediumGray};
	border-radius: 0.5rem;
	border-right: none;
	color: ${({ theme }) => theme.colors.mediumGray};

	svg {
		height: 4rem;
		width: 4rem;
		margin: 0;
		color: black;
	}
`;
