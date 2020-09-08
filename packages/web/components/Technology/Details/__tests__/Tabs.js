import React from 'react';
import { render, fireEvent } from 'test-utils';
import Tabs from '../Tabs';
import useTechnology from '../../../../hooks/useTechnology';
import TechnologyDetailsFixture from './techonlogyDetailsFixture.json';

jest.mock('../../../../hooks/useTechnology', () => jest.fn());

useTechnology.mockImplementation(() => {
	return { technology: TechnologyDetailsFixture };
});

describe('Tabs Testing', () => {
	describe('Tabs Rendering', () => {
		test('it render the tabs page with "sobre a tecnology" selected', () => {
			const { container } = render(<Tabs />);

			expect(container).toMatchSnapshot();
		});

		test('it render the tabs page with "caracterização" selected', () => {
			const { container, getByText } = render(<Tabs />);
			fireEvent.click(getByText('Caracterização'), {});
			expect(container).toMatchSnapshot();
		});

		test('it render the tabs page with "georeferenciamento" selected', () => {
			const { container, getByText } = render(<Tabs />);
			fireEvent.click(getByText('Georeferenciamento'), {});
			expect(container).toMatchSnapshot();
		});
	});

	describe('Georeferenciamento Testing', () => {
		test('when clicking in the marker that was checked before remove it from the filter', () => {
			const { container, getByText } = render(<Tabs />);
			fireEvent.click(getByText('Georeferenciamento'), {});
			fireEvent.click(container.querySelector('#where_is_already_implemented'), {});
			expect(container).toMatchSnapshot();
		});

		test('when clicking in the marker that was NOT checked before remove it from the filter', () => {
			const { container, getByText } = render(<Tabs />);
			fireEvent.click(getByText('Georeferenciamento'), {});
			fireEvent.click(container.querySelector('#where_is_already_implemented'), {});
			fireEvent.click(container.querySelector('#where_is_already_implemented'), {});
			expect(container).toMatchSnapshot();
		});
	});
});
