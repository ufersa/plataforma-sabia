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
				can_buy_technology: true,
			},
		});
		render(
			<TechnologyProvider technology={fakeTechnology}>
				<Header />
			</TechnologyProvider>,
		);

		fireEvent.click(screen.getByText(/Adquirir essa tecnologia/i));
		expect(screen.getByRole('button', { name: /adquirir tecnologia/i })).toBeInTheDocument(2);
	});
});
