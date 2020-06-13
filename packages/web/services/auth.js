import { setCookie } from '../utils/helper';
import { apiPost, apiGet } from './api';

/**
 * Attempts to authenticate the provided user within the API.
 *
 * @param {string} email The email in the system.
 * @param {string} password The password in the system.
 *
 * @returns {Promise<{}|boolean>} A promise that resolves to the user or false;
 */
export async function login(email, password) {
	const response = await apiPost(
		'auth/login',
		{
			email,
			password,
		},
		{ json: false },
	);

	const result = await response.json();

	if (response.status === 200 && result.token) {
		setCookie('token', result.token, 7);
	}

	return result;
}

/**
 * Fetches the user data of the authenticated user.
 *
 * @param {string} token The JWT token
 */
export async function getMe(token) {
	return apiGet('user/me', {
		token,
	}).catch(() => false);
}

/**
 * Calls the register endpoint.
 *
 * @param {string} fullname The full name of the user.
 * @param {string} email User email.
 * @param {string} password User password.
 */
export async function register(fullname, email, password) {
	return apiPost('auth/register', {
		full_name: fullname,
		scope: 'web',
		email,
		password,
	});
}

/**
 * Calls the resend confirmation email endpoint.
 *
 * @param {string} email User email.
 */
export async function emailConfirmation(email) {
	return apiPost('auth/resend-confirmation-email', {
		scope: 'web',
		email,
	});
}

/**
 * Will drop user's authentication cookies if present.
 */
export function logout() {
	setCookie('token', '');
}
