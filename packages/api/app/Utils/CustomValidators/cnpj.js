const { antl } = require('..');

const customRules = (value) => {
	if (!value) {
		return false;
	}

	const validTypes = typeof value === 'string' || Number.isInteger(value) || Array.isArray(value);

	if (!validTypes) {
		return false;
	}

	const match = value.toString().match(/\d/g);
	const numbers = Array.isArray(match) ? match.map(Number) : [];

	if (numbers.length !== 14) {
		return false;
	}

	const items = [...new Set(numbers)];

	if (items.length === 1) {
		return false;
	}

	const calc = (digit) => {
		const slice = numbers.slice(0, digit);
		let factor = digit - 7;
		let sum = 0;

		for (let i = digit; i >= 1; i -= 1) {
			const n = slice[digit - i];
			sum += n * factor;
			factor -= 1;
			if (factor < 2) factor = 9;
		}

		const result = 11 - (sum % 11);

		return result > 9 ? 0 : result;
	};

	const digits = numbers.slice(12);

	const digit0 = calc(12);

	if (digit0 !== digits[0]) {
		return false;
	}

	const digit1 = calc(13);
	return digit1 === digits[1];
};

async function cnpj(data, field, message, args, get = () => data[field]) {
	const value = get(data, field);

	if (!value) {
		return;
	}

	const sanitizedValue = value.replace(/[^\d]/g, '');

	if (!customRules(sanitizedValue)) {
		throw antl('error.cpf.invalid', { value });
	}
}

module.exports = cnpj;
