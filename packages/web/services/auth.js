/**
 * Attempts to authenticate the provided user within the API.
 *
 * @param {string} email The email in the system.
 * @param {string} password The password in the system.
 *
 * @returns {Promise<{}|boolean>} A promise that resolves to the user or false;
 */
export async function login(email, password) {
	const response = await fetch(`http://127.0.0.1:3333/auth/login`, {
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

	return result;
}

export async function getMe(token) {
	const response = await fetch(`http://127.0.0.1:3333/user/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => res.json());

	return response;
}

/**
 * Will drop user's authentication cookies if present.
 */
export function logout() {}
