import styled from 'styled-components';

const Button = styled.button`
	background-color: ${(props) => props.bgColor};
	color: ${(props) => props.color};
	border: none;
	border-radius: 4px;
	font-size: 2.2rem;
	font-weight: 500;
	text-transform: uppercase;
	padding: 18px 60px;
	text-align: center;
	text-decoration: none;
	display: inline-block;

	:hover {
		opacity: 0.8;
	}
`;

export default Button;
