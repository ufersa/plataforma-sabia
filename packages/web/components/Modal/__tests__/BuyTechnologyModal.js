import React from 'react';

import { render, screen, fireEvent } from 'test-utils';
import BuyTechnologyModal from '../BuyTechnologyModal';

const fakeTechnology = {
	id: 1,
	title: 'Abcdefgh',
	thumbnail: '/technology-thumbnail.jpg',
};

jest.mock('react-select', () => ({ options, value, onChange }) => {
	function handleChange(event) {
		const option = options.find((opt) => opt.value === event.currentTarget.value);
		onChange(option);
	}
	return (
		<select data-testid="select" value={value} onChange={handleChange}>
			{options.map(({ label, value: optValue }) => (
				<option key={optValue} value={optValue}>
					{label}
				</option>
			))}
		</select>
	);
});

describe('<BuyTechnologyModal />', () => {
	it('should render correctly', () => {
		const { container } = render(<BuyTechnologyModal technology={fakeTechnology} />);

		expect(screen.getByRole('img', { src: '/technology-thumbnail.jpg' })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /abcdefgh/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/quantas unidades da tecnologia\?/i)).toBeInTheDocument();
		expect(screen.getAllByRole('textbox')[0].textContent).toBe('0');
		expect(screen.getByLabelText(/a tecnologia será adquirida para uso:/i)).toBeInTheDocument();
		expect(screen.getByTestId('select')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /adquirir tecnologia/i })).toBeDisabled();

		expect(container).toMatchSnapshot();
	});

	it('should increase and decrease technology quantity when clicking buttons', () => {
		render(<BuyTechnologyModal technology={fakeTechnology} />);

		const decreaseButton = screen.getByRole('button', { name: /decrease quantity/i });
		const increaseButton = screen.getByRole('button', { name: /increase quantity/i });

		expect(decreaseButton).toBeDisabled();
		expect(increaseButton).toBeEnabled();

		fireEvent.click(increaseButton);

		expect(screen.getAllByRole('textbox')[0].textContent).toBe('1');

		expect(decreaseButton).toBeEnabled();
		fireEvent.click(decreaseButton);

		expect(screen.getAllByRole('textbox')[0].textContent).toBe('0');
	});

	it('should be able to choose technology use', () => {
		render(<BuyTechnologyModal technology={fakeTechnology} />);

		const privateRadio = screen.getByLabelText(/privado/i);
		const companyRadio = screen.getByLabelText(/empresa/i);

		fireEvent.click(privateRadio);
		expect(privateRadio).toBeChecked();

		fireEvent.click(companyRadio);
		expect(companyRadio).toBeChecked();
		expect(privateRadio).not.toBeChecked();
	});

	it('should enable submit button if required fields is filled', () => {
		render(<BuyTechnologyModal technology={fakeTechnology} />);

		const buyButton = screen.getByRole('button', { name: /adquirir tecnologia/i });
		expect(buyButton).toBeDisabled();

		const increaseButton = screen.getByRole('button', { name: /increase quantity/i });
		fireEvent.click(increaseButton);

		const privateRadio = screen.getByLabelText(/privado/i);
		fireEvent.click(privateRadio);

		const select = screen.getByTestId('select');
		fireEvent.change(select, { target: { value: 'have-funding' } });

		expect(buyButton).toBeEnabled();
	});
});
