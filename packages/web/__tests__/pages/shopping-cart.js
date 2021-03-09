import React from 'react';

import { render, screen } from 'test-utils';
import ShoppingCartPage from '../../pages/shopping-cart';

describe('<ShoppingCart />', () => {
	it('should render empty screen if theres no items in cart', () => {
		render(<ShoppingCartPage />);

		expect(screen.getByText(/parece que seu carrinho está vazio/i)).toBeInTheDocument();
	});
});
