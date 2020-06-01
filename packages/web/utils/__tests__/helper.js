import {
	formatDistance,
	truncateText,
	normalize,
	getPeriod,
	validationErrorMessage,
	setCookie,
} from '../helper';

test.each([
	['January 1, 2020 00:00:00', 'January 1, 2020 00:00:00', '0 segundos atrás'],
	['January 1, 2020 00:00:00', 'January 1, 2020 00:00:10', '10 segundos atrás'],
	['January 1, 2020 00:00:00', 'January 1, 2020 00:01:00', '60 segundos atrás'],
	['January 1, 2020 00:00:00', 'January 1, 2020 00:01:30', '1 minuto atrás'],
	['January 1, 2020 00:00:00', 'January 1, 2020 00:30:00', '30 minutos atrás'],
	['January 1, 2020 00:00:00', 'January 1, 2020 01:00:00', '60 minutos atrás'],
	['January 1, 2020 00:00:00', 'January 1, 2020 01:30:00', '1 hora atrás'],
	['January 1, 2020 00:00:00', 'January 1, 2020 02:00:00', '2 horas atrás'],
	['January 1, 2020 00:00:00', 'January 2, 2020 00:00:00', '24 horas atrás'],
	['January 1, 2020 00:00:00', 'January 2, 2020 02:00:00', 'Há 1 dia atrás'],
	['January 1, 2020 00:00:00', 'February 2, 2020 02:00:00', 'Há 1 mês atrás'],
	['January 1, 2020 00:00:00', 'March 2, 2020 02:00:00', 'Há 2 meses atrás'],
	['January 1, 2020 00:00:00', 'February 2, 2021 02:00:00', 'Há 1 ano atrás'],
	['January 1, 2019 00:00:00', 'February 2, 2021 02:00:00', 'Há 2 anos atrás'],
])('formatDistance(%s, %s) => %s', (previousDate, currentDate, ouput) => {
	expect(formatDistance(new Date(previousDate), new Date(currentDate))).toBe(ouput);
});

test('truncate text works', () => {
	expect(truncateText('Lorem Ipsum Dolor Sit Amet', 2)).toBe('Lorem Ipsum...');
	expect(truncateText('Lorem Ipsum Dolor Sit Amet', 10)).toBe('Lorem Ipsum Dolor Sit Amet...');
});

test.each([
	[1, '1 dia'],
	[6, '6 dias'],
	[7, '1 semana'],
	[8, '1 semana'],
	[14, '2 semanas'],
	[30, '1 mês'],
	[35, '1 mês'],
	[60, '2 meses'],
	[365, '1 ano'],
	[390, '1 ano'],
	[730, '2 anos'],
])('getPeriod(%d) => %s', (days, output) => {
	expect(getPeriod(days)).toBe(output);
});

test('normalize string works', () => {
	const string = 'éééé ááááá ãõê````';
	expect(normalize(string)).toBe('eeee aaaaa aoe');
	expect(normalize(string)).not.toBe(string);
});

test('validationErrorMessage works', () => {
	const defaultErrorMessage = 'default error message';
	const t = () => defaultErrorMessage;
	expect(validationErrorMessage({ type: 'required' }, t)).toBe(defaultErrorMessage);
	expect(validationErrorMessage({ type: 'required', message: 'custom error message' }, t)).toBe(
		'custom error message',
	);
});

test('setCookie works', () => {
	const getExpiration = (days) => {
		const d = new Date();
		d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
		return d.toGMTString();
	};
	let cookieDefinition = setCookie('testCookie', 'testValue');

	expect(cookieDefinition).toEqual(expect.stringMatching(/testCookie=testValue;(.*)path=\//));

	cookieDefinition = setCookie('testCookie2', 'testValue', 10);
	expect(cookieDefinition).toEqual(`testCookie2=testValue;expires=${getExpiration(10)};path=/`);
	cookieDefinition = setCookie('testCookie3', 'testValue', 1);
	expect(cookieDefinition).toEqual(`testCookie3=testValue;expires=${getExpiration(1)};path=/`);
});
