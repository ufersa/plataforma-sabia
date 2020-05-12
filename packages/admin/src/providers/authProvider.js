const authProvider = {
	login: async ({ email, password, recaptchaToken }) => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: new Headers({
				'Content-Type': 'application/json',
				recaptchaToken,
			}),
		});

		if (response.status < 200 || response.status >= 300) {
			throw new Error(response.statusText);
		}
		const { token, type } = await response.json();
		localStorage.setItem('token', `${type} ${token}`);
	},
	logout: async () => {
		return localStorage.removeItem('token');
	},
	checkError: async (error) => {
		const { status } = error;
		if (status === 401 || status === 403) {
			localStorage.removeItem('token');
			return true;
		}
		return false;
	},
	checkAuth: async () => {
		const result = !!localStorage.getItem('token');
		if (!result) {
			throw new TypeError();
		}
	},
	getPermissions: () => {
		const role = localStorage.getItem('permissions');
		return role ? Promise.resolve(role) : Promise.reject();
	},
};
export default authProvider;
