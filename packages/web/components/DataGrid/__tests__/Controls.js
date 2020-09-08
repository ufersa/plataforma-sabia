import React from 'react';
import { render, fireEvent } from 'test-utils';

import Controls from '../Controls';

// Component props mock
const mockData = [];
const mockSortOptions = [
	{ value: 'id', label: 'Id' },
	{ value: 'title', label: 'Título' },
	{ value: 'status', label: 'Status' },
];
let mockHandleSortBy;
let mockHandlePagination;

jest.mock('react-select', () => ({ options, value, onChange }) => {
	function handleChange(event) {
		const option = options.find((opt) => opt.value === event.currentTarget.value);

		onChange(option);
	}

	return (
		<select data-testid="select" value={value} onChange={handleChange}>
			{options.map(({ label, value: oValue }) => (
				<option key={label} value={oValue}>
					{label}
				</option>
			))}
		</select>
	);
});

describe('<Controls />', () => {
	beforeEach(() => {
		mockHandleSortBy = jest.fn((option, order) => ({ option, order }));
		mockHandlePagination = jest.fn((newPage) => newPage);
	});

	it('should render without crashing', () => {
		const { container } = render(<Controls data={mockData} />);
		expect(container).toMatchSnapshot();
	});

	it('should render order select if handleSortBy is not null', () => {
		const { getByTestId } = render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
			/>,
		);

		expect(getByTestId('select')).toBeInTheDocument();
	});

	it('should render ascending and descending buttons if select value is not empty', () => {
		const { getByLabelText, getByTestId } = render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
			/>,
		);

		fireEvent.change(getByTestId('select'), {
			target: { value: 'title' },
		});

		expect(getByLabelText('Ascending Order')).toBeInTheDocument();
		expect(getByLabelText('Descending Order')).toBeInTheDocument();
	});

	it('should exec handleSortBy passing option as first argument and undefined as second argument when changing select ', () => {
		const { getByTestId } = render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
			/>,
		);

		fireEvent.change(getByTestId('select'), {
			target: { value: 'title' },
		});

		expect(mockHandleSortBy.mock.calls).toHaveLength(1);
		// The first argument of the first call to the function should be 'title'
		expect(mockHandleSortBy.mock.calls[0][0]).toBe('title');
		// The second argument of the first call to the function should be 'undefined'
		expect(mockHandleSortBy.mock.calls[0][1]).toBeUndefined();
	});

	it('should exec handleSortBy passing current option as first argument and `ASC` as second argument when clicking ascending button ', () => {
		const { getByLabelText, getByTestId } = render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
			/>,
		);

		fireEvent.change(getByTestId('select'), {
			target: { value: 'status' },
		});

		fireEvent.click(getByLabelText('Ascending Order'));

		expect(mockHandleSortBy.mock.calls).toHaveLength(2);
		// The first argument of the second call to the function should be 'status'
		expect(mockHandleSortBy.mock.calls[1][0]).toBe('status');
		// The second argument of the second call to the function should be 'ASC'
		expect(mockHandleSortBy.mock.calls[1][1]).toBe('ASC');
	});

	it('should exec handleSortBy passing current option as first argument and `DESC` as second argument when clicking descending button ', () => {
		const { getByLabelText, getByTestId } = render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
			/>,
		);

		fireEvent.change(getByTestId('select'), {
			target: { value: 'id' },
		});

		fireEvent.click(getByLabelText('Descending Order'));

		expect(mockHandleSortBy.mock.calls).toHaveLength(2);
		// The first argument of the second call to the function should be 'id'
		expect(mockHandleSortBy.mock.calls[1][0]).toBe('id');
		// The second argument of the second call to the function should be 'DESC'
		expect(mockHandleSortBy.mock.calls[1][1]).toBe('DESC');
	});

	it('should render pagination controls if handlePagination is not null', () => {
		const { getByLabelText } = render(
			<Controls data={mockData} handlePagination={mockHandlePagination} />,
		);

		expect(getByLabelText('First Page')).toBeInTheDocument();
		expect(getByLabelText('Previous Page')).toBeInTheDocument();
		expect(getByLabelText('Next Page')).toBeInTheDocument();
		expect(getByLabelText('Last Page')).toBeInTheDocument();
	});

	it('should disable pagination controls if totalPages equals 1', () => {
		const { getByLabelText } = render(
			<Controls data={mockData} handlePagination={mockHandlePagination} />,
		);

		expect(getByLabelText('First Page')).toBeDisabled();
		expect(getByLabelText('Previous Page')).toBeDisabled();
		expect(getByLabelText('Next Page')).toBeDisabled();
		expect(getByLabelText('Last Page')).toBeDisabled();
	});

	it('should disable only first page and previous page buttons if currentPage is less than totalPages', () => {
		const { getByLabelText } = render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={1}
				totalPages={2}
			/>,
		);

		expect(getByLabelText('First Page')).toBeDisabled();
		expect(getByLabelText('Previous Page')).toBeDisabled();

		expect(getByLabelText('Next Page')).toBeEnabled();
		expect(getByLabelText('Last Page')).toBeEnabled();
	});

	it('should disable only next page and last page buttons if currentPage equals totalPages', () => {
		const { getByLabelText } = render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={2}
				totalPages={2}
			/>,
		);

		expect(getByLabelText('First Page')).toBeEnabled();
		expect(getByLabelText('Previous Page')).toBeEnabled();

		expect(getByLabelText('Next Page')).toBeDisabled();
		expect(getByLabelText('Last Page')).toBeDisabled();
	});

	it('should exec handlePagination passing 1 as argument when clicking first page button', () => {
		const { getByLabelText } = render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={2}
				totalPages={2}
			/>,
		);

		fireEvent.click(getByLabelText('First Page'));

		expect(mockHandlePagination.mock.calls).toHaveLength(1);
		// The first argument of the first call to the function should be 1
		expect(mockHandlePagination.mock.calls[0][0]).toBe(1);
	});

	it('should exec handlePagination passing currentPage - 1 as argument when clicking previous page button', () => {
		const currentPage = 3;
		const { getByLabelText } = render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={currentPage}
				totalPages={4}
			/>,
		);

		fireEvent.click(getByLabelText('Previous Page'));

		expect(mockHandlePagination.mock.calls).toHaveLength(1);
		// The first argument of the first call to the function should be 2
		expect(mockHandlePagination.mock.calls[0][0]).toBe(currentPage - 1);
	});

	it('should exec handlePagination passing currentPage + 1 as argument when clicking next page button ', () => {
		const currentPage = 1;
		const { getByLabelText } = render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={currentPage}
				totalPages={3}
			/>,
		);

		fireEvent.click(getByLabelText('Next Page'));

		expect(mockHandlePagination.mock.calls).toHaveLength(1);
		// The first argument of the first call to the function should be 2
		expect(mockHandlePagination.mock.calls[0][0]).toBe(currentPage + 1);
	});

	it('should exec handlePagination passing 3 as argument when clicking last page button and totalPages equals 3', () => {
		const { getByLabelText } = render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={1}
				totalPages={3}
			/>,
		);

		fireEvent.click(getByLabelText('Last Page'));

		expect(mockHandlePagination.mock.calls).toHaveLength(1);
		// The first argument of the first call to the function should be 3
		expect(mockHandlePagination.mock.calls[0][0]).toBe(3);
	});
});
