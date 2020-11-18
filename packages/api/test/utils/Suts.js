const Factory = use('Factory');
const User = use('App/Models/User');
const Disclaimer = use('App/Models/Disclaimer');

const getAllTermsOfUse = async () => {
	const disclaimer = await Disclaimer.query()
		.select('id')
		.fetch();
	return disclaimer.toJSON().map((row) => row.id);
};

const createUser = async ({ customUser, userAppend, onlyDependencies } = {}) => {
	const randomNumber = Math.floor(Math.random() * 100);

	const defaultUser = {
		email: `sabiatestingemail-${randomNumber}@gmail.com`,
		password: '123123',
		first_name: 'FirstName',
		last_name: 'LastName',
		company: 'Company',
		zipcode: '9999999',
		cpf: '52100865005',
		birth_date: '1900-01-01',
		phone_number: '(99)23456789',
		lattes_id: '1234567890',
		address: 'Testing address, 99',
		address2: 'Complement 99',
		district: '99',
		city: 'Test City',
		state: 'TT',
		country: 'Fictional Country',
	};

	const userToCreate =
		customUser || (userAppend ? { ...defaultUser, ...userAppend } : defaultUser);
	const institution = await Factory.model('App/Models/Institution').create();

	const createdUser = !onlyDependencies
		? await User.create({ ...userToCreate, institution_id: institution.id })
		: null;

	if (createdUser) {
		const allTermsOfUse = await getAllTermsOfUse();
		await createdUser.accept(allTermsOfUse);
	}

	return { institution, createdUser };
};

module.exports = {
	createUser,
	disclaimers: Array.from(Array(30).keys()),
};
