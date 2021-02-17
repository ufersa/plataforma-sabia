import React, { useReducer, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { setCookie, getCookie } from '../../utils/helper';
import ShoppingCartContext from './ShoppingCartContext';

/*
 * This context must be as generic as possible
 * So in the future we can handle many solutions easily (i.e. services, technologies, researchers...)
 * Whoever is consuming must pass all parameters in the right shape.
 * This context isn't responsible for knowing if 'price' is inside 'costs' or any other level in object tree.
 *
 * Item shape: {
 *   id (string|number: object_id),
 *   thumbnail (string: URL),
 *   name (string: object_title),
 *   institution (string: institution_name),
 *   price (number: object_price),
 *   type (string: solution type, i.e. 'service', 'technology'...)
 *   quantity (number|string)
 *	 measureUnit (@see utils/api.enum)
 * }
 */

const shoppingCartReducer = (state, action) => {
	const { payload } = action;

	if (!payload.type && action.type !== 'LOAD_ITEMS_FROM_COOKIES') {
		throw new Error(
			'Please pass "type" property when adding items to cart. Its useful and needed to discern solutions',
		);
	}

	switch (action.type) {
		case 'ADD_ITEM':
			return { ...state, items: [...state.items, payload] };

		case 'UPDATE_ITEM':
			return {
				...state,
				items: state.items.map((item) =>
					item.id === payload.id && item.type === payload.type
						? { ...item, ...payload }
						: item,
				),
			};

		case 'REMOVE_ITEM':
			return {
				...state,
				items: state.items.filter(
					(item) => !(item.type === payload.type && item.id === payload.id),
				),
			};

		case 'LOAD_ITEMS_FROM_COOKIES':
			return { ...state, items: [...state.items, ...payload] };

		default:
			throw new Error('Invalid shopping cart action');
	}
};

const initialState = {
	items: [],
};

const ShoppingCartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(shoppingCartReducer, initialState);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const items = JSON.parse(getCookie('shopping-cart'));

			if (items.length) {
				dispatch({ type: 'LOAD_ITEMS_FROM_COOKIES', payload: items });
			}
		}
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCookie('shopping-cart', JSON.stringify(state.items), 7);
		}
	}, [state.items]);

	const totalPrice = useMemo(
		() => state.items.reduce((acc, curr) => acc + curr.price * (curr.quantity || 1), 0),
		[state.items],
	);

	const addItem = useCallback((item) => {
		dispatch({ type: 'ADD_ITEM', payload: item });
	}, []);

	const updateItem = useCallback((item) => {
		dispatch({ type: 'UPDATE_ITEM', payload: item });
	}, []);

	const removeItem = useCallback((item) => {
		dispatch({ type: 'REMOVE_ITEM', payload: item });
	}, []);

	return (
		<ShoppingCartContext.Provider
			value={{ ...state, totalPrice, addItem, updateItem, removeItem }}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};

ShoppingCartProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
};

export default ShoppingCartProvider;
