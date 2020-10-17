const User = use('App/Models/User');
const Disclaimer = use('App/Models/Disclaimer');

const getAllTermsOfUse = () => {
	return Disclaimer.query()
		.select('id')
		.fetch()
		.then((result) =>
			result.toJSON().map((row) => {
				return row.id;
			}),
		);
};
const createUser = async (data) => {
	const newUser = await User.create(data);
	const allTermsOfUse = await getAllTermsOfUse();
	try {
		await newUser.accept(allTermsOfUse);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
	}

	return newUser;
};

const userDefault = async (data = {}) => {
	const allTermsOfUse = await getAllTermsOfUse();
	return {
		...data,
		email: 'sabiatestingemail@gmail.com',
		password: '123123',
		first_name: 'FirstName',
		last_name: 'LastName',
		disclaimers: allTermsOfUse,
	};
};

const disclaimers = Array.from(Array(30).keys());

module.exports = {
	createUser,
	userDefault,
	disclaimers,
};
