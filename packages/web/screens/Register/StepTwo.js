import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FiArrowRight } from 'react-icons/fi';
import { RectangularButton } from '../../components/Button';
import { CheckBoxField, InputField } from '../../components/Form';
import { register } from '../../services';
import { toast } from '../../components/Toast';

import * as S from './styles';

const StepTwo = ({ activeStep, setNextStep, updateUserData }) => {
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordConfirm: '',
			privacyTerms: false,
		},
	});
	const passwordField = useRef({});
	passwordField.current = form.watch('password');

	const handleSubmit = async ({ email, password }) => {
		const response = await register(email, password);

		if (response.error) {
			toast.error(
				response.error.message[0].message ||
					'Ocorreu um erro para efetuar seu registro. Recarregue a página e tente novamente...',
			);
			return;
		}

		updateUserData(response);
		setNextStep();
	};

	return (
		<S.Form onSubmit={form.handleSubmit(handleSubmit)}>
			<S.StepTitle>{activeStep.title}</S.StepTitle>
			<S.StepSubtitle>{activeStep.subtitle}</S.StepSubtitle>

			<S.InputsWrapper>
				<InputField
					name="email"
					form={form}
					label="Email"
					placeholder="Digite seu e-mail"
					variant="lightRounded"
					validation={{ required: true }}
				/>

				<InputField
					name="password"
					form={form}
					label="Senha"
					placeholder="Digite sua senha"
					variant="lightRounded"
					type="password"
					validation={{ required: true }}
				/>

				<InputField
					name="passwordConfirm"
					form={form}
					label="Confirmar senha"
					placeholder="Confirme sua senha"
					variant="lightRounded"
					type="password"
					validation={{
						required: true,
						validate: {
							passwordMatch: (value) =>
								passwordField.current === value || 'As senhas não são iguais',
						},
					}}
				/>

				<S.CheckboxWrapper>
					<CheckBoxField
						form={form}
						validation={{ required: true }}
						name="terms-and-privacy"
						label={
							<S.CheckboxLabel>
								Concordo com os{' '}
								<a href="/terms-of-use" target="_blank">
									termos de uso
								</a>{' '}
								e{' '}
								<a href="/privacy-policy" target="_blank">
									política de privacidade
								</a>{' '}
								da Plataforma Sabiá
							</S.CheckboxLabel>
						}
						noPadding
						variant="rounded"
					/>

					<CheckBoxField
						form={form}
						name="receive-news"
						label={
							<S.CheckboxLabel>
								Concordo em receber novidades da Plataforma Sabiá por email.
								(OPCIONAL)
							</S.CheckboxLabel>
						}
						noPadding
						variant="rounded"
					/>
				</S.CheckboxWrapper>
			</S.InputsWrapper>

			<S.FloatingAction>
				<RectangularButton variant="round" colorVariant="green" type="submit">
					Continuar
					<FiArrowRight fontSize="2rem" />
				</RectangularButton>
			</S.FloatingAction>
		</S.Form>
	);
};

StepTwo.propTypes = {
	activeStep: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
	}).isRequired,
	setNextStep: PropTypes.func.isRequired,
	updateUserData: PropTypes.func.isRequired,
};

export default StepTwo;
