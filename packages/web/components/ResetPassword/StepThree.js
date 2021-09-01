import PropTypes from 'prop-types';
import { useForm, useWatch } from 'react-hook-form';
import { useState } from 'react';
import { RectangularButton } from '../Button';
import { Error, InputField } from '../Form';
import { useAuth, useTheme } from '../../hooks';
import * as S from './styles';
import PasswordStrength from '../PasswordStrength';
import { checkPasswordStrength } from '../../utils/helper';

const StepThree = ({ activeStep, setNextStep, updateUserData, userData }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const form = useForm({
		defaultValues: { password: '', confirmPassword: '' },
	});
	const { resetPassword } = useAuth();
	const passwordValue = useWatch({
		control: form.control,
		name: 'password',
	});
	const theme = useTheme();

	const handleSubmit = async ({ password }) => {
		setIsSubmitting(true);
		setError('');

		const response = await resetPassword({
			email: userData.email,
			token: userData.token,
			password,
		});

		if (response.error) {
			setError(response.error.message?.[0]?.message || response.error.message);
			setIsSubmitting(false);
			return;
		}

		updateUserData({ password });
		setNextStep();
	};

	return (
		<S.Wrapper>
			<S.Form onSubmit={form.handleSubmit(handleSubmit)}>
				<S.StepTitle>{activeStep.title}</S.StepTitle>
				<S.StepSubtitle smallFontSize>{activeStep.subtitle}</S.StepSubtitle>

				{!!error && <Error message={error} />}

				<S.InputsWrapper>
					<S.PasswordWrapper>
						<InputField
							form={form}
							validation={{
								required: true,
								validate: {
									passwordStrength: (value) => {
										const strength = checkPasswordStrength(value);

										const isValid = Object.values(strength).every(
											(item) => !!item,
										);

										return isValid || '';
									},
								},
							}}
							name="password"
							label="Informe a sua nova senha"
							placeholder="Digite sua nova senha"
							variant="lightRounded"
							type="password"
						/>
						<PasswordStrength
							form={form}
							inputToWatch="password"
							mobileBreakpoint={theme.screens.large}
						/>
					</S.PasswordWrapper>
					<InputField
						form={form}
						validation={{
							required: true,
							validate: {
								passwordMatch: (value) =>
									passwordValue === value || 'As senhas não são iguais',
							},
						}}
						name="confirmPassword"
						label="Confirme a sua nova senha"
						placeholder="Repita a sua senha"
						variant="lightRounded"
						type="password"
					/>
				</S.InputsWrapper>

				<S.Actions>
					<RectangularButton
						colorVariant="green"
						variant="round"
						type="submit"
						disabled={isSubmitting}
						fullWidth
					>
						{isSubmitting ? 'Aguarde...' : 'Confirmar alteração'}
					</RectangularButton>
				</S.Actions>
			</S.Form>
		</S.Wrapper>
	);
};

StepThree.propTypes = {
	activeStep: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	}).isRequired,
	userData: PropTypes.shape({
		email: PropTypes.string.isRequired,
		token: PropTypes.string.isRequired,
	}).isRequired,
	setNextStep: PropTypes.func.isRequired,
	updateUserData: PropTypes.func.isRequired,
};

export default StepThree;
