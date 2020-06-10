import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	@font-face {
		font-family: 'TT Norms';
		src: url('/static/fonts/TTNorms-Regular.otf');
		font-style: normal;
		font-weight: 400;
		font-display: fallback;
	}

	@font-face {
		font-family: 'TT Norms';
		src: url('/static/fonts/TTNorms-Medium.otf');
		font-style: normal;
		font-weight: 500;
		font-display: fallback;
	}

	*,
	*::after,
	*::before {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: 'TT Norms', sans-serif;
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
	button,
	h1{
		font-weight: 500;
	}
	input,
	h2,
	h3,
	h4,
	h5,
	h6{
		font-weight: 400;
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
		font-size: 5rem;
		color: ${({ theme }) => theme.colors.white};
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
		font-size: 1.6rem;
		color: ${({ theme }) => theme.colors.primary};
	}
	h5,
	h6{
		color: ${({ theme }) => theme.colors.secondary};
	}
`;
