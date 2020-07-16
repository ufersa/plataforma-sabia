import MutationObserver from '@sheerun/mutationobserver-shim';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import 'core-js';
import '@testing-library/jest-dom';

window.MutationObserver = MutationObserver;
