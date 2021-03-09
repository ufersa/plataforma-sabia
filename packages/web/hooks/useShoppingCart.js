import { useContext } from 'react';
import ShoppingCartContext from '../components/ShoppingCart/ShoppingCartContext';

function useShoppingCart() {
	const context = useContext(ShoppingCartContext);
	if (context === undefined) {
		throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
	}
	return context;
}

export default useShoppingCart;
