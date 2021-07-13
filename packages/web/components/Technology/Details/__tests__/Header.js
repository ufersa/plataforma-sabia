import React from 'react';
import { render, screen, fireEvent } from 'test-utils';

import { TechnologyProvider } from '../../TechnologyProvider';
import Header from '../Header';
import * as useAuth from '../../../../hooks/useAuth';

const fakeTechnology = {
	id: 1,
	title: 'Abcdefgh',
	thumbnail: '/technology-thumbnail.jpg',
	likes: 0,
	technologyCosts: {
		is_seller: true,
		price: 1000,
	},
};

describe('<Header />', () => {
	it('should open buy modal when clicking buy button', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: 'test@test.com',
				operations: {
					can_buy_technology: true,
				},
			},
			isAuthenticated: true,
		});
		render(
			<TechnologyProvider technology={fakeTechnology}>
				<Header />
			</TechnologyProvider>,
		);

		fireEvent.click(screen.getByText(/Adquirir essa tecnologia/i));
		expect(screen.getByRole('button', { name: /adquirir tecnologia/i })).toBeInTheDocument(2);
	});

	it('should render technology price and buy button if user is the seller', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: 'test@test.com',
			},
			isAuthenticated: true,
		});
		render(
			<TechnologyProvider
				technology={{
					...fakeTechnology,
					technologyCosts: { is_seller: true, price: 12345 },
				}}
			>
				<Header />
			</TechnologyProvider>,
		);

		expect(screen.getByRole('heading', { name: 'R$ 12.345,00' })).toBeInTheDocument();
		expect(screen.getByText(/adquirir essa tecnologia/i)).toBeInTheDocument();
	});

	it('should not render price and buy button if user isnt the seller', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: 'test@test.com',
			},
			isAuthenticated: true,
		});
		render(
			<TechnologyProvider
				technology={{
					...fakeTechnology,
					technologyCosts: { is_seller: false, price: 12345 },
				}}
			>
				<Header />
			</TechnologyProvider>,
		);

		expect(screen.queryByRole('heading', { name: 'R$ 12.345,00' })).not.toBeInTheDocument();
		expect(screen.queryByText(/adquirir essa tecnologia/i)).not.toBeInTheDocument();
	});
});
