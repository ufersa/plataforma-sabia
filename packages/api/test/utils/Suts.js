/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Disclaimer = use('App/Models/Disclaimer');

const createUser = async ({ customUser, userAppend, onlyDependencies } = {}) => {
	const randomNumber = () => Math.floor(Math.random() * 1000);

	/**
	 * Institution
	 */
	const institution = await Factory.model('App/Models/Institution').create();

	/**
	 * User
	 */
	const defaultUser = {
		email: `sabia-${randomNumber()}-testing-${randomNumber()}@gmail.com`,
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

	const createdUser = !onlyDependencies
		? await User.create({ ...userToCreate, institution_id: institution.id })
		: null;

	const createdUserJson = { ...userToCreate, ...createdUser.toJSON() };

	/**
	 * Disclaimers
	 */
	const allTermsOfUse = (
		await Disclaimer.query()
			.select('id')
			.fetch()
	)
		.toJSON()
		.map((term) => term.id);

	if (createdUser) {
		await createdUser.accept(allTermsOfUse);
	}

	return {
		institution,
		createdUser,
		createdUserJson,
	};
};

module.exports = {
	createUser,
	disclaimers: Array.from(Array(30).keys()),
};
