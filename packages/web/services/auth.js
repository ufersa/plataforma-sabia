import { setCookie } from '../utils/helper';
import { apiPost, apiGet } from './api';

/**
 * Normalizes the bookmarks for fill the technology like.
 *
 * @param {Array} bookmarks User bookmarks
 * @returns {number[]}
 */
function normalizeBookmarks(bookmarks) {
	if (!Array.isArray(bookmarks)) {
		return [];
	}

	return bookmarks.map((bookmark) => ({
		solution: bookmark.objectID.split('-')[0],
		id: bookmark.id,
	}));
}

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
 * @param {object} params Optional params.
 * @param {boolean} [params.embed] Response with embed.
 */
export async function getMe(token, params = {}) {
	const response = await apiGet('user/me', {
		token,
		...params,
	});

	if (response.status !== 200) {
		return false;
	}

	if (params.bookmarks && response.data.bookmarks) {
		response.data.bookmarks = normalizeBookmarks(response.data.bookmarks);
	}

	return response.data;
}

/**
 * Calls the register endpoint.
 *
 * @param {string} fullname The full name of the user.
 * @param {string} email User email.
 * @param {string} password User password.
 */
export async function register(email, password) {
	return apiPost('auth/register', {
		scope: 'web',
		email,
		password,
		disclaimers: Array.from(Array(10).keys()),
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
 *
 * @returns {boolean} The response status.
 */
export async function requestPasswordReset(email) {
	return apiGet('auth/forgot-password', {
		email,
		scope: 'web',
	})
		.then((response) => response.data)
		.catch(() => false);
}

/**
 * Calls the reset password endpoint.
 *
 * @param {string} token The reset password token.
 * @param {string} password New user password.
 * @param {string} email User email.
 *
 * @returns {object} The response status.
 */
export function resetPassword(token, password, email) {
	return apiPost('auth/reset-password', {
		token,
		password,
		email,
	})
		.then((response) => response.data)
		.catch(() => false);
}

/**
 * Calls the confirmation account endpoint.
 *
 * @param {string} token The confirmation token.
 * @param {string} email User email.
 *
 * @returns {object} The response status.
 */
export function accountConfirmation(token, email) {
	return apiPost('auth/confirm-account', {
		token,
		email,
	})
		.then((response) => response.data)
		.catch(() => false);
}
