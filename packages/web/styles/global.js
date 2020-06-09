import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	*,
	*::after,
	*::before {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: 'Rubik', sans-serif;
	}
	*:focus {
		outline: 0;
	}
	html,
	body {
		height: 100vh;
		background: ${({ theme }) => theme.colors.white};
	}
	html {
		font-size: 62.5%;
	}
	body {
		-webkit-font-smoothing: antialiased;
		font-size: 1.6rem;
	}
	input,
	button {
		font: 1.4rem;
	}
	a {
		text-decoration: none;
		transition: all 0.2s ease;
		:hover {
			cursor: pointer;
		}
	}
	ul {
		list-style: none;
	}
	button {
		cursor: pointer;
	}
	a,
	input,
	button,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: 500;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-variant-ligatures: common-ligatures;
		line-height: 1.6;
		letter-spacing: 0.8px;
	}
	h1 {
		color: ${({ theme }) => theme.colors.white};
		font-size: 5rem;
	}
	h2 {
		font-size: 4.5rem;
		color: ${({ theme }) => theme.colors.secondary};
	}
	h3 {
		color: ${({ theme }) => theme.colors.darkGray};
		font-size: 2.4rem;
	}
	h4 {
		color: ${({ theme }) => theme.colors.primary};
		font-size: 1.6rem;
	}
	h5,
	h6{
		color: ${({ theme }) => theme.colors.secondary};
	}
`;
