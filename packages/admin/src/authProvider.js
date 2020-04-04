const authProvider = {
	login: ({ email, password }) => {
		const request = new Request('http://127.0.0.1:3333/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
		return fetch(request)
			.then((response) => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(({ token, type }) => {
				localStorage.setItem('token', `${type} ${token}`);
			});
	},
	logout: () => {
		localStorage.removeItem('token');
		return Promise.resolve();
	},
	checkError: (error) => {
		const { status } = error;
		if (status === 401 || status === 403) {
			localStorage.removeItem('token');
			return Promise.reject();
		}
		return Promise.resolve();
	},
	checkAuth: () => {
		return localStorage.getItem('token')
			? Promise.resolve()
			: Promise.reject(new TypeError('unauthenticated'), { redirectTo: '/login' });
	},
	getPermissions: () => {
		const role = localStorage.getItem('permissions');
		return role ? Promise.resolve(role) : Promise.reject();
	},
};
export default authProvider;
