import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import * as S from './styles';

const checkStrength = (password) => {
	const strong = {
		length: false,
		uppercase: false,
		lowercase: false,
		number: false,
		special: false,
	};

	if (password.length >= 8) {
		strong.length = true;
	}

	if (/[A-Z]/.test(password)) {
		strong.uppercase = true;
	}

	if (/[a-z]/.test(password)) {
		strong.lowercase = true;
	}

	if (/[0-9]/.test(password)) {
		strong.number = true;
	}

	if (/[!@#$%^&*()\-_+'"`~=[\];{}?/\\]/.test(password)) {
		strong.special = true;
	}

	return strong;
};

const strengthList = [
	{
		key: 'length',
		text: 'Mínimo de 8 caracteres',
	},
	{
		key: 'uppercase',
		text: 'Letras maiúsculas (A-Z)',
	},
	{
		key: 'lowercase',
		text: 'Letras minúsculas (a-z)',
	},
	{
		key: 'number',
		text: 'Números (0-9)',
	},
	{
		key: 'special',
		text: 'Caracteres especiais',
	},
];

const PasswordStrength = ({ form, inputToWatch, mobileBreakpoint }) => {
	const inputValue = useWatch({
		control: form.control,
		name: inputToWatch,
	});
	const strength = useMemo(() => checkStrength(inputValue), [inputValue]);

	useEffect(() => {
		const hasError = Object.values(strength).some((item) => !item);

		if (hasError) {
			form.setError(inputToWatch);
		} else {
			form.clearErrors(inputToWatch);
		}

		// Form is already memoized by hook-form
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue, strength]);

	return (
		<S.Wrapper mobileBreakpoint={mobileBreakpoint}>
			<S.Container>
				<S.Title>Sua senha deve conter:</S.Title>
				<S.StrengthList>
					{strengthList.map((item) => (
						<S.StrengthItem key={item.key} success={strength[item.key]}>
							{item.text}
						</S.StrengthItem>
					))}
				</S.StrengthList>
			</S.Container>
		</S.Wrapper>
	);
};

PasswordStrength.propTypes = {
	form: PropTypes.shape({
		control: PropTypes.shape({}),
		setError: PropTypes.func,
		clearErrors: PropTypes.func,
	}).isRequired,
	inputToWatch: PropTypes.string.isRequired,
	mobileBreakpoint: PropTypes.number,
};

PasswordStrength.defaultProps = {
	mobileBreakpoint: undefined,
};

export default PasswordStrength;
