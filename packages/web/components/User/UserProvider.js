import React, { useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as auth from '../../services/auth';
import UserContext from './UserContext';

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

		if (!result) {
			return false;
		}

		dispatch({
			type: 'SET_USER',
			payload: {
				user: result,
			},
		});

		return true;
	}, []);

	const login = useCallback(
		async (email, password) => {
			try {
				const jwt = await auth.login(email, password);
				if (jwt.token) {
					await getMe(jwt.token);
				}
				return jwt;
			} catch (exception) {
				return false;
			}
		},
		[getMe],
	);

	const logout = useCallback(() => {
		auth.logout();
		dispatch({
			type: 'LOGOUT_USER',
		});
	}, []);

	const register = useCallback(async ({ fullname, email, password }) => {
		try {
			return auth.register(fullname, email, password);
		} catch (exception) {
			return false;
		}
	}, []);

	const emailConfirmation = useCallback(async ({ email }) => {
		try {
			return await auth.emailConfirmation(email);
		} catch (exception) {
			return false;
		}
	}, []);

	const requestPasswordReset = useCallback(async ({ email }) => {
		try {
			return auth.requestPasswordReset(email);
		} catch (exception) {
			return false;
		}
	}, []);

	return (
		<UserContext.Provider
			value={{
				user: state,
				login,
				logout,
				register,
				emailConfirmation,
				requestPasswordReset,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
	user: PropTypes.shape({}),
};

UserProvider.defaultProps = {
	user: {},
};

export default UserProvider;
