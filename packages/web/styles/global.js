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

	@font-face {
		font-family: 'Museo';
		src: url('/static/fonts/Museo500-Regular.otf');
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
	h1, h2{
		font-weight: 500;
		font-family: 'Museo', sans-serif;
	}
	input,
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

	/* Make clicks pass-through */
	#nprogress {
		pointer-events: none;
	}

	#nprogress .bar {
		background: ${({ theme }) => theme.colors.darkGreen};

		position: fixed;
		z-index: 1031;
		top: 0;
		left: 0;

		width: 100%;
		height: 2px;
	}

	/* Fancy blur effect */
	#nprogress .peg {
		display: block;
		position: absolute;
		right: 0px;
		width: 100px;
		height: 100%;
		box-shadow: 0 0 10px #29d, 0 0 5px #29d;
		opacity: 1.0;

		-webkit-transform: rotate(3deg) translate(0px, -4px);
			-ms-transform: rotate(3deg) translate(0px, -4px);
				transform: rotate(3deg) translate(0px, -4px);
	}

	/* Remove these to get rid of the spinner */
	#nprogress .spinner {
		display: block;
		position: fixed;
		z-index: 1031;
		top: 15px;
		right: 15px;
	}

	#nprogress .spinner-icon {
		width: 18px;
		height: 18px;
		box-sizing: border-box;

		border: solid 2px transparent;
		border-top-color: ${({ theme }) => theme.colors.darkGreen};
		border-left-color: ${({ theme }) => theme.colors.darkGreen};
		border-radius: 50%;

		-webkit-animation: nprogress-spinner 400ms linear infinite;
				animation: nprogress-spinner 400ms linear infinite;
	}

	.nprogress-custom-parent {
		overflow: hidden;
		position: relative;
	}

	.nprogress-custom-parent #nprogress .spinner,
	.nprogress-custom-parent #nprogress .bar {
		position: absolute;
	}

	@-webkit-keyframes nprogress-spinner {
		0%   { -webkit-transform: rotate(0deg); }
		100% { -webkit-transform: rotate(360deg); }
	}
	@keyframes nprogress-spinner {
		0%   { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
`;
