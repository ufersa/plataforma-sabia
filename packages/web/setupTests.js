import MutationObserver from '@sheerun/mutationobserver-shim';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import 'core-js';
import '@testing-library/jest-dom';

window.MutationObserver = MutationObserver;

window.matchMedia =
	window.matchMedia ||
	function() {
		return {
			matches: false,
			addListener() {},
			removeListener() {},
		};
	};

window.requestAnimationFrame =
	window.requestAnimationFrame ||
	function(callback) {
		setTimeout(callback, 0);
	};
