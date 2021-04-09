import React, { useReducer, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { setCookie, getCookie, isRunningOnBrowser } from '../../utils/helper';
import { getServices } from '../../services';
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

	if (!payload?.type && action.type !== 'LOAD_ITEMS' && action.type !== 'RESET_CART') {
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

		case 'LOAD_ITEMS':
			return { ...state, items: payload };

		case 'RESET_CART':
			return { items: [] };

		default:
			throw new Error('Invalid shopping cart action');
	}
};

const initialState = {
	items: [],
};

const ShoppingCartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(shoppingCartReducer, initialState);

	/*
	 * Loads saved items from browser cookies
	 */
	useEffect(() => {
		if (isRunningOnBrowser()) {
			const items = JSON.parse(getCookie('shopping-cart'));

			if (items.length) {
				dispatch({ type: 'LOAD_ITEMS', payload: items });
			}
		}
	}, []);

	/*
	 * Saves state items to browser cookies once it's modified
	 */
	useEffect(() => {
		if (isRunningOnBrowser()) {
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

	const resetCart = useCallback(() => {
		dispatch({ type: 'RESET_CART' });
	}, []);

	const itemIsInCart = useCallback(
		(id, solutionType) => {
			return state.items.some((item) => item.type === solutionType && item.id === id);
		},
		[state.items],
	);

	/*
	 * Check if there's any change to the product that happened after user added to cart
	 * It'll only work with services for now
	 * Should think in the future an abstraction to handle other solutions
	 */
	const checkForItemsUpdates = useCallback(async () => {
		const servicesId = state.items.map((item) => item.id);
		const services = await getServices({ ids: servicesId });

		const servicesChanges = state.items
			.reduce((acc, item) => {
				const serviceFetched = services.find((service) => service.id === item.id);

				// If there's no service match between state and API means that service has been deleted
				if (!serviceFetched) {
					acc.push({ id: item.id, name: item.name, from: item.name, type: 'deleted' });
					dispatch({
						type: 'REMOVE_ITEM',
						payload: { id: item.id, type: 'service' },
					});
					return acc;
				}

				if (serviceFetched.name !== item.name)
					acc.push({
						id: item.id,
						name: item.name,
						type: 'nameChanged',
						from: item.name,
						to: serviceFetched.name,
					});

				if (
					!!serviceFetched.user?.institution?.initials &&
					serviceFetched.user?.institution?.initials !== item.institution
				)
					acc.push({
						id: item.id,
						name: item.name,
						type: 'institutionChanged',
						from: item.institution,
						to: serviceFetched.user.institution.initials,
					});

				if (serviceFetched.price !== item.price)
					acc.push({
						id: item.id,
						name: item.name,
						type: 'priceChanged',
						from: item.price,
						to: serviceFetched.price,
					});

				if (serviceFetched.measure_unit !== item.measureUnit)
					acc.push({
						id: item.id,
						name: item.name,
						type: 'measureUnitChanged',
						from: item.measureUnit,
						to: serviceFetched.measure_unit,
					});

				dispatch({
					type: 'UPDATE_ITEM',
					payload: {
						id: item.id,
						thumbnail: serviceFetched.thumbnail?.url,
						name: serviceFetched.name,
						institution: serviceFetched.user?.institution?.name,
						price: serviceFetched.price,
						measureUnit: serviceFetched.measure_unit,
						type: 'service',
					},
				});

				return acc;
			}, [])
			.filter(Boolean);

		return servicesChanges;
	}, [state]);

	return (
		<ShoppingCartContext.Provider
			value={{
				...state,
				totalPrice,
				addItem,
				updateItem,
				removeItem,
				resetCart,
				checkForItemsUpdates,
				itemIsInCart,
			}}
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
