import React, { useReducer, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as auth from '../../services/auth';
import UserContext from './UserContext';

/**
 * The user reducer.
 *
 * @param {object} state The user state object.
 * @param {object} action The dispatched action.
 *
 * @returns {object} the mutated state.
 */
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

/**
 * Register a new user through the auth service.
 *
 * @param {object} user The user object.
 * @param {string} user.fullname Full name of the user.
 * @param {string} user.email User email.
 * @param {string} user.password User password.
 *
 * @returns {object|boolean} User object if successfull, false otherwise.
 */
const register = async ({ fullname, email, password }) => {
	try {
		return auth.register(fullname, email, password);
	} catch (exception) {
		return false;
	}
};

/**
 * Calls the email confirmation endpoint.
 *
 * @param {object} options Options.
 * @param {string} options.email User email to confirm.
 *
 * @returns {boolean}
 */
const emailConfirmation = async ({ email }) => {
	try {
		return await auth.emailConfirmation(email);
	} catch (exception) {
		return false;
	}
};

/**
 * Resets the user password through the provided token.
 *
 * @param {object} options Options.
 * @param {string} options.token Unique token sent to the user.
 * @param {string} options.email User email.
 *
 * @returns {boolean}
 */
const accountConfirmation = async ({ token, email }) => {
	try {
		return auth.accountConfirmation(token, email);
	} catch (exception) {
		return false;
	}
};

/**
 * Calls the request password reset  endpoint.
 *
 * @param {object} options Options.
 * @param {string} options.email User email to confirm.
 *
 * @returns {boolean}
 */
const requestPasswordReset = async ({ email }) => {
	try {
		return auth.requestPasswordReset(email);
	} catch (exception) {
		return false;
	}
};

/**
 * Resets the user password through the provided token.
 *
 * @param {object} options Options.
 * @param {string} options.token Unique token sent to the user.
 * @param {string} options.password New password.
 *
 * @returns {boolean}
 */
const resetPassword = async ({ token, password, email }) => {
	try {
		return auth.resetPassword(token, password, email);
	} catch (exception) {
		return false;
	}
};

export const UserProvider = ({ children, user }) => {
	const [state, dispatch] = useReducer(userReducer, user);

	const setUser = useCallback((value) => {
		dispatch({
			type: 'SET_USER',
			payload: {
				user: value,
			},
		});
	}, []);

	useEffect(() => {
		setUser(user);
	}, [user, setUser]);

	const getMe = useCallback(
		async (jwtToken, params = {}) => {
			const result = await auth.getMe(jwtToken, params);

			if (!result) {
				return false;
			}

			setUser(result);

			return true;
		},
		[setUser],
	);

	const login = useCallback(
		async (email, password) => {
			try {
				const jwt = await auth.login(email, password);
				if (jwt.token) {
					await getMe(jwt.token, { bookmarks: true });
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

	return (
		<UserContext.Provider
			value={{
				user: state,
				setUser,
				login,
				logout,
				register,
				emailConfirmation,
				accountConfirmation,
				requestPasswordReset,
				resetPassword,
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
