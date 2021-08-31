import PropTypes from 'prop-types';
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

const PasswordStrength = ({ form, inputToWatch }) => {
	const inputValue = useWatch({
		control: form.control,
		name: inputToWatch,
	});
	const strength = checkStrength(inputValue);

	return (
		<S.Wrapper>
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
	form: PropTypes.shape({ control: PropTypes.shape({}) }).isRequired,
	inputToWatch: PropTypes.string.isRequired,
};

export default PasswordStrength;
