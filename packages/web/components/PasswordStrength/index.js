import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import * as S from './styles';
import { checkPasswordStrength } from '../../utils/helper';

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
	const strength = checkPasswordStrength(inputValue);

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
