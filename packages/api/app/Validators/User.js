class User {
	get rules() {
		return {
			email: 'required|email|unique:users',
			password: 'required',
		};
	}
}

module.exports = User;
