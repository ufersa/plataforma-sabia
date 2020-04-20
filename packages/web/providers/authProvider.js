const authProvider = {
	login: async ({ email, password }) => {
		const request = new Request('http://localhost:3333/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});

		const response = await fetch(request);

		if (response.status < 200 || response.status >= 300) {
			throw new Error(response.statusText);
		}

		const { token, type } = await response.json();
		await this.setCookie(type, token, 1);
	},

	setCookie: ({ cname, cvalue, exdays }) => {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		const expires = `expires=${d.toGMTString()}`;

		document.cookie = `${cname}=${cvalue};${expires};path=/`;
		return true;
	},

	getCookie: ({ cname }) => {
		const name = `${cname}=`;
		const decodedCookie = decodeURIComponent(document.cookie);
		const ca = decodedCookie.split(';');

		for (let i = 0; i < ca.length; i + 1) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	},
};

export default authProvider;
