import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: ${(props) => props.bgColor};
	color: ${(props) => props.color};
	border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	border: none;
	font-size: 2.2rem;
	text-transform: uppercase;
	padding: 1.8rem 6rem;
	text-align: center;
	text-decoration: none;
	display: inline-block;

	:hover {
		opacity: 0.8;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		font-size: 1.6rem;
		padding: 1.4rem 6rem;
	}
`;

export default StyledButton;
