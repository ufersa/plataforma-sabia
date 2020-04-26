import React, { useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';

import * as auth from '../../services/auth';
import { setCookie } from '../../utils/helper';

export const UserContext = React.createContext({});

const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_USER':
			return { ...state, ...payload.user };
		case 'LOGOUT_USER':
			return {};
		default:
			throw new Error('Invalid action');
	}
};

export const UserProvider = ({ children, user }) => {
	const [state, dispatch] = useReducer(userReducer, user);

	const getMe = useCallback(async (jwtToken) => {
		const result = await auth.getMe(jwtToken);

		dispatch({
			type: 'SET_USER',
			payload: {
				user: result,
			},
		});

		return true;
	}, []);

	const login = async (email, password) => {
		try {
			const jwt = await auth.login(email, password);

			if (!jwt.token) {
				throw new Error('Missing token');
			}

			setCookie('token', jwt.token, 7);
			await getMe(jwt.token);
			return true;
		} catch (e) {
			return false;
		}
	};

	const logout = () => {
		setCookie('token', '');
		dispatch({
			type: 'LOGOUT_USER',
		});
	};

	return (
		<UserContext.Provider value={{ user: state, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
	user: PropTypes.shape({}),
};

UserProvider.defaultProps = {
	user: {},
};

export default UserProvider;
