/* eslint-disable func-names */
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

class AutocompleteServiceMock {
	getPlacePredictions(_filters, callback) {
		callback([], 'OK');
	}
}

window.google = window.google || {
	maps: {
		places: {
			AutocompleteService: AutocompleteServiceMock,
			PlacesServiceStatus: {
				INVALID_REQUEST: 'INVALID_REQUEST',
				NOT_FOUND: 'NOT_FOUND',
				OK: 'OK',
				OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
				REQUEST_DENIED: 'REQUEST_DENIED',
				UNKNOWN_ERROR: 'UNKNOWN_ERROR',
				ZERO_RESULTS: 'ZERO_RESULTS',
			},
		},
	},
};
