const repeated = [
	'11111111111',
	'22222222222',
	'33333333333',
	'44444444444',
	'55555555555',
	'66666666666',
	'77777777777',
	'88888888888',
	'99999999999',
];

async function cpf(data, field, message, args, get = () => data[field]) {
	const value = get(data, field);

	if (!value) {
		// required rule should take care
		return;
	}

	if (!/^[\d-.]+$/.test(value)) {
		// accepts only digits, - and .
		throw message || `invalid cpf (${value}).`;
	}

	const sanitizedValue = value.replace(/[^\d]/g, '');

	if (!/\d{11}/.test(sanitizedValue)) {
		// not a number and not enough digits
		throw message || `invalid cpf field lenght (${sanitizedValue.lenght}). expected 11 digits.`;
	}

	if (sanitizedValue.length !== 11) {
		throw message || `invalid cpf field lenght (${sanitizedValue.lenght}). expected 11 digits.`;
	}

	if (repeated.includes(sanitizedValue)) {
		// not repeated
		throw message || `invalid cpf (${value}).`;
	}

	let sum = 0;
	let remainder;

	for (let i = 1; i <= 9; i += 1) {
		sum += parseInt(sanitizedValue.substring(i - 1, i), 10) * (11 - i);
	}

	remainder = (sum * 10) % 11;

	if (remainder === 10 || remainder === 11) remainder = 0;
	if (remainder !== parseInt(sanitizedValue.substring(9, 10), 10))
		throw message || `invalid cpf (${value}).`;

	sum = 0;

	for (let i = 1; i <= 10; i += 1) {
		sum += parseInt(sanitizedValue.substring(i - 1, i), 10) * (12 - i);
	}

	remainder = (sum * 10) % 11;

	if (remainder === 10 || remainder === 11) remainder = 0;
	if (remainder !== parseInt(sanitizedValue.substring(10, 11), 10))
		throw message || `invalid cpf (${value}).`;
}

module.exports = cpf;
