import { setCookie } from '../utils/helper';

const baseUrl = process.env.API_URL;
/**
 * Attempts to authenticate the provided user within the API.
 *
 * @param {string} email The email in the system.
 * @param {string} password The password in the system.
 *
 * @returns {Promise<{}|boolean>} A promise that resolves to the user or false;
 */
export async function login(email, password) {
	const response = await fetch(`${baseUrl}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});
	const result = await response.json();

	if (response.status !== 200) {
		throw new Error('Credenciais Inválidas');
	}

	if (!result.token) {
		throw new Error('Missing token');
	}

	setCookie('token', result.token, 7);

	return result;
}

export async function getMe(token) {
	const response = await fetch(`${baseUrl}/user/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => res.json());

	return response;
}

export async function register(fullname, email, password) {
	const response = await fetch(`${baseUrl}/auth/register`, {
		method: 'POST',
		body: JSON.stringify({
			full_name: fullname,
			email,
			password,
		}),
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.json());
	return response;
}

/**
 * Will drop user's authentication cookies if present.
 */
export function logout() {
	setCookie('token', '');
}
