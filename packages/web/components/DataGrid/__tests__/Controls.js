import React from 'react';
import { render, fireEvent, screen } from 'test-utils';

import Controls from '../Controls';
import { ORDERING as orderEnum } from '../../../utils/enums/api.enum';

// Component props mock
const mockData = [];
const mockSortOptions = [
	{ value: 'id', label: 'Id' },
	{ value: 'title', label: 'Título' },
	{ value: 'status', label: 'Status' },
];
let mockHandleSortBy;
let mockHandlePagination;

jest.mock('react-select', () => ({ options, value, onChange, styles }) => {
	function handleChange(event) {
		const option = options.find((opt) => opt.value === event.currentTarget.value);

		onChange(option);
	}

	const stylesObj = {
		...styles.container(null, { isFocused: true }),
		...styles.placeholder(null, { value: 'title' }),
		...styles.input(null, { value: 'title' }),
		...styles.singleValue(null, { value: 'title' }),
		...styles.valueContainer(),
	};

	return (
		<select data-testid="select" value={value} onChange={handleChange} style={stylesObj}>
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
		render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
			/>,
		);

		expect(screen.getByTestId('select')).toBeInTheDocument();
	});

	it('should render ascending and descending buttons if select value is not empty', () => {
		render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
			/>,
		);

		fireEvent.change(screen.getByTestId('select'), {
			target: { value: 'title' },
		});

		expect(screen.getByLabelText('Ascending Order')).toBeInTheDocument();
		expect(screen.getByLabelText('Descending Order')).toBeInTheDocument();
	});

	it('should set className `active` on ascending icon if currentOrder is `ASC`', () => {
		render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
				currentOrder={orderEnum.ASC}
			/>,
		);

		fireEvent.change(screen.getByTestId('select'), {
			target: { value: 'title' },
		});

		expect(screen.getByLabelText('Ascending Order').firstChild).toHaveClass('active');
	});

	it('should set className `active` on descending icon if currentOrder is `DESC`', () => {
		render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
				currentOrder={orderEnum.DESC}
			/>,
		);

		fireEvent.change(screen.getByTestId('select'), {
			target: { value: 'title' },
		});

		expect(screen.getByLabelText('Descending Order').firstChild).toHaveClass('active');
	});

	it('should exec handleSortBy passing option as first argument and undefined as second argument when changing select ', () => {
		render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
			/>,
		);

		fireEvent.change(screen.getByTestId('select'), {
			target: { value: 'title' },
		});

		expect(mockHandleSortBy).toHaveBeenNthCalledWith(1, 'title');
	});

	it('should exec handleSortBy passing current option as first argument and `ASC` as second argument when clicking ascending button ', () => {
		render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
			/>,
		);

		fireEvent.change(screen.getByTestId('select'), {
			target: { value: 'status' },
		});

		fireEvent.click(screen.getByLabelText('Ascending Order'));

		expect(mockHandleSortBy).toHaveBeenNthCalledWith(1, 'status');
		expect(mockHandleSortBy).toHaveBeenNthCalledWith(2, 'status', orderEnum.ASC);
	});

	it('should exec handleSortBy passing current option as first argument and `DESC` as second argument when clicking descending button ', () => {
		render(
			<Controls
				data={mockData}
				handleSortBy={mockHandleSortBy}
				sortOptions={mockSortOptions}
			/>,
		);

		fireEvent.change(screen.getByTestId('select'), {
			target: { value: 'id' },
		});

		fireEvent.click(screen.getByLabelText('Descending Order'));

		expect(mockHandleSortBy).toHaveBeenNthCalledWith(1, 'id');
		expect(mockHandleSortBy).toHaveBeenNthCalledWith(2, 'id', orderEnum.DESC);
	});

	it('should render pagination controls if handlePagination is not null', () => {
		render(<Controls data={mockData} handlePagination={mockHandlePagination} />);

		expect(screen.getByLabelText('First Page')).toBeInTheDocument();
		expect(screen.getByLabelText('Previous Page')).toBeInTheDocument();
		expect(screen.getByLabelText('Next Page')).toBeInTheDocument();
		expect(screen.getByLabelText('Last Page')).toBeInTheDocument();
	});

	it('should disable pagination controls if totalPages equals 1', () => {
		render(<Controls data={mockData} handlePagination={mockHandlePagination} />);

		expect(screen.getByLabelText('First Page')).toBeDisabled();
		expect(screen.getByLabelText('Previous Page')).toBeDisabled();
		expect(screen.getByLabelText('Next Page')).toBeDisabled();
		expect(screen.getByLabelText('Last Page')).toBeDisabled();
	});

	it('should disable only first page and previous page buttons if currentPage is less than totalPages', () => {
		render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={1}
				totalPages={2}
			/>,
		);

		expect(screen.getByLabelText('First Page')).toBeDisabled();
		expect(screen.getByLabelText('Previous Page')).toBeDisabled();

		expect(screen.getByLabelText('Next Page')).toBeEnabled();
		expect(screen.getByLabelText('Last Page')).toBeEnabled();
	});

	it('should disable only next page and last page buttons if currentPage equals totalPages', () => {
		render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={2}
				totalPages={2}
			/>,
		);

		expect(screen.getByLabelText('First Page')).toBeEnabled();
		expect(screen.getByLabelText('Previous Page')).toBeEnabled();

		expect(screen.getByLabelText('Next Page')).toBeDisabled();
		expect(screen.getByLabelText('Last Page')).toBeDisabled();
	});

	it('should exec handlePagination passing 1 as argument when clicking first page button', () => {
		render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={2}
				totalPages={2}
			/>,
		);

		fireEvent.click(screen.getByLabelText('First Page'));

		expect(mockHandlePagination).toHaveBeenNthCalledWith(1, 1);
	});

	it('should exec handlePagination passing currentPage - 1 as argument when clicking previous page button', () => {
		const currentPage = 3;
		render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={currentPage}
				totalPages={4}
			/>,
		);

		fireEvent.click(screen.getByLabelText('Previous Page'));

		expect(mockHandlePagination).toHaveBeenNthCalledWith(1, currentPage - 1);
	});

	it('should exec handlePagination passing currentPage + 1 as argument when clicking next page button ', () => {
		const currentPage = 1;
		render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={currentPage}
				totalPages={3}
			/>,
		);

		fireEvent.click(screen.getByLabelText('Next Page'));

		expect(mockHandlePagination).toHaveBeenNthCalledWith(1, currentPage + 1);
	});

	it('should exec handlePagination passing 3 as argument when clicking last page button and totalPages equals 3', () => {
		render(
			<Controls
				data={mockData}
				handlePagination={mockHandlePagination}
				currentPage={1}
				totalPages={3}
			/>,
		);

		fireEvent.click(screen.getByLabelText('Last Page'));

		expect(mockHandlePagination).toHaveBeenNthCalledWith(1, 3);
	});
});
