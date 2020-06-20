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
	const response = await apiPost('auth/login', {
		email,
		password,
	});

	if (response.status === 200 && response.data.token) {
		setCookie('token', response.data.token, 7);
	}

	return response.data;
}

/**
 * Fetches the user data of the authenticated user.
 *
 * @param {string} token The JWT token
 */
export async function getMe(token) {
	return apiGet('user/me', {
		token,
	})
		.then((response) => response.data)
		.catch(() => false);
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
	}).then((response) => response.data);
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
	}).then((response) => response.data);
}

/**
 * Will drop user's authentication cookies if present.
 */
export function logout() {
	setCookie('token', '');
}

/**
 * Handle password resets.
 *
 * @param {string} email The email in the system.
 * @param {string} [scope=web] The project scope.
 *
 * @returns {boolean} The response status.
 */
export async function requestPasswordReset(email, scope = 'web') {
	return apiGet('auth/forgot-password', {
		email,
		scope,
	})
		.then((response) => response.success)
		.catch(() => false);
}
