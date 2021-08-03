import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	*,
	*::after,
	*::before {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
    	-moz-osx-font-smoothing: grayscale;
		font-family: 'Montserrat', 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
		font-size: 1.6rem;

		&.modal-open {
			overflow: hidden;
		}
	}
	#__next {
		height: 100%;
	}
	a, button, p, span, li, input {
		font-family: 'Montserrat';
	}
	a, button {
		font-weight: 700;
	}
	a {
		font-size: 1.2rem;
		text-decoration: none;
		transition: all 0.2s ease;
		:hover {
			cursor: pointer;
		}
	}
	button {
		font-size: 1.6rem;
		cursor: pointer;
	}
	input {
		font-size: 1.4rem;
	}
	input:-webkit-autofill { 
		background-clip: text;
    -webkit-background-clip: text;
	}

	ul {
		list-style: none;
	}
	h1, h2{
		font-weight: 500;
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
		font-family: 'Rubik';
		font-variant-ligatures: common-ligatures;
		line-height: 1.6;
		letter-spacing: 0.8px;
	}
	h1 {
		font-size: 5rem;
		font-weight: 700;
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
		z-index: 1100;
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
		z-index: 1100;
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

	/* Slick Carousel */
	.slick-slider {
		position: relative;
		display: block;
		box-sizing: border-box;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-touch-callout: none;
		-khtml-user-select: none;
		-ms-touch-action: pan-y;
		touch-action: pan-y;
		-webkit-tap-highlight-color: transparent;
	}

	.slick-list {
		position: relative;
		display: block;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

	.slick-list:focus {
		outline: none;
	}

	.slick-list.dragging {
		cursor: pointer;
		cursor: hand;
	}

	.slick-slider .slick-track,
	.slick-slider .slick-list {
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		-ms-transform: translate3d(0, 0, 0);
		-o-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}

	.slick-track {
		position: relative;
		top: 0;
		left: 0;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	.slick-track:before,
	.slick-track:after {
		display: table;
		content: '';
	}

	.slick-track:after {
		clear: both;
	}

	.slick-loading .slick-track {
		visibility: hidden;
	}

	.slick-slide {
		display: none;
		float: left;
		height: 100%;
		min-height: 1px;
	}

	[dir='rtl'] .slick-slide {
		float: right;
	}

	.slick-slide img {
		display: block;
	}

	.slick-slide.slick-loading img {
		display: none;
	}

	.slick-slide.dragging img {
		pointer-events: none;
	}

	.slick-initialized .slick-slide {
		display: block;
	}

	.slick-loading .slick-slide {
		visibility: hidden;
	}

	.slick-vertical .slick-slide {
		display: block;
		height: auto;
		border: 1px solid transparent;
	}

	.slick-arrow.slick-hidden {
		display: none;
	}

	.slick-loading .slick-list {
		background: #fff;
	}

	.slick-prev,
	.slick-next {
		font-size: 0;
		line-height: 0;
		position: absolute;
		top: 50%;
		display: block;
		width: 20px;
		height: 20px;
		padding: 0;
		-webkit-transform: translate(0, -50%);
		-ms-transform: translate(0, -50%);
		transform: translate(0, -50%);
		cursor: pointer;
		color: transparent;
		border: none;
		outline: none;
		background: transparent;
	}

	.slick-prev:hover,
	.slick-prev:focus,
	.slick-next:hover,
	.slick-next:focus {
		color: transparent;
		outline: none;
		background: transparent;
	}

	.slick-prev:hover:before,
	.slick-prev:focus:before,
	.slick-next:hover:before,
	.slick-next:focus:before {
		opacity: 1;
	}

	.slick-prev.slick-disabled:before,
	.slick-next.slick-disabled:before {
		opacity: .25;
	}

	.slick-prev:before,
	.slick-next:before {
		font-family: 'slick';
		font-size: 20px;
		line-height: 1;
		opacity: .75;
		color: white;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.slick-prev {
		left: -25px;
	}

	[dir='rtl'] .slick-prev {
		right: -25px;
		left: auto;
	}

	.slick-prev:before {
		content: '←';
	}

	[dir='rtl'] .slick-prev:before {
		content: '→';
	}

	.slick-next {
		right: -25px;
	}

	[dir='rtl'] .slick-next {
		right: auto;
		left: -25px;
	}

	.slick-next:before {
		content: '→';
	}

	[dir='rtl'] .slick-next:before {
		content: '←';
	}


	/* Dots */

	.slick-dotted.slick-slider {
		margin-bottom: 30px;
	}

	.slick-dots {
		display: block;
		width: 100%;
		padding: 0;
		margin: 0;
		list-style: none;
		text-align: center;
	}

	.slick-dots li {
		position: relative;
		display: inline-block;
		width: 20px;
		height: 20px;
		margin: 0 5px;
		padding: 0;
		cursor: pointer;
	}

	.slick-dots li button {
		font-size: 0;
		line-height: 0;
		display: block;
		width: 20px;
		height: 20px;
		padding: 5px;
		cursor: pointer;
		color: transparent;
		border: 0;
		outline: none;
		background: transparent;
	}

	.slick-dots li button:hover,
	.slick-dots li button:focus {
		outline: none;
	}

	.slick-dots li button:hover:before,
	.slick-dots li button:focus:before {
		opacity: 1;
	}

	.slick-dots li button:before {
		font-family: 'slick';
		font-size: 6px;
		line-height: 20px;
		position: absolute;
		top: 0;
		left: 0;
		width: 20px;
		height: 20px;
		content: '•';
		text-align: center;
		opacity: .25;
		color: black;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.slick-dots li.slick-active button:before {
		opacity: .75;
		color: black;
	}

	// Needed so CKEditor link panel works in modals
	body .ck.ck-balloon-panel {
		z-index: 1500;
	}
`;
