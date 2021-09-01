import PropTypes from 'prop-types';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { FiCornerUpLeft } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { RectangularButton } from '../Button';
import { useAuth } from '../../hooks';
import { Error, VerificationCodeField } from '../Form';
import { toast } from '../Toast';
import * as S from './styles';
import { checkVerificationCode } from '../../services';

const StepTwo = ({ activeStep, setNextStep, setPrevStep, userData, updateUserData }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const verificationCodeRef = useRef();
	const form = useForm({
		defaultValues: { verificationCode: Array(6).fill('') },
		reValidateMode: 'onSubmit',
	});
	const verificationCode = useWatch({
		control: form.control,
		name: 'verificationCode',
	});
	const { requestPasswordReset } = useAuth();
	const { t } = useTranslation();

	useEffect(() => {
		if (verificationCodeRef.current) {
			verificationCodeRef.current.focus();
		}

		// We only want this to run when component is mounted
		// react-hook-form funcs is already memoized
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async () => {
		setIsSubmitting(true);
		setError('');
		const token = verificationCode.join('');

		const response = await checkVerificationCode({
			email: userData.email,
			token,
			tokenType: 'reset-password',
		});

		if (response.error) {
			setError(response.error.message?.[0]?.message || response.error.message);
			setIsSubmitting(false);
			form.reset();
			verificationCodeRef.current.focus();
			return;
		}

		updateUserData({ token });
		setNextStep();
	};

	useEffect(() => {
		const isAllFilled = verificationCode.every((code) => code.length > 0);

		if (isAllFilled) {
			form.handleSubmit(handleSubmit)();
		}
		// react-hook-form funcs is already memoized
		// Everytime `verificationCode` changes, `shouldShowEmailField` also change, so we don't need it here
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [verificationCode]);

	const handleResendCodeValidation = async () => {
		form.clearErrors();
		setIsSubmitting(true);
		const response = await requestPasswordReset({ email: userData.email });

		if (response?.error) {
			toast.error(
				response.error.message[0].message ||
					'Ocorreu um erro para efetuar seu registro. Recarregue a página e tente novamente...',
			);
			setIsSubmitting(false);
			return;
		}

		if (response.success) {
			toast.success('Enviamos um novo código para o seu e-mail!');
			verificationCodeRef.current.focus();
		}

		setIsSubmitting(false);
	};

	return (
		<S.Wrapper>
			<S.Form onSubmit={form.handleSubmit(handleSubmit)}>
				<S.StepTitle>{activeStep.title}</S.StepTitle>
				<S.StepSubtitle smallFontSize>{activeStep.subtitle}</S.StepSubtitle>

				{!!error && <Error message={error} />}

				<S.InputsWrapper>
					<S.VerificationCodeWrapper>
						<Controller
							name="verificationCode"
							control={form.control}
							rules={{
								validate: {
									allFieldsFilled: (value) => {
										return (
											value.every((_val) => _val.length) ||
											t('error:requiredField')
										);
									},
								},
							}}
							render={({ field, fieldState }) => (
								<VerificationCodeField
									ref={verificationCodeRef}
									value={field.value}
									onChange={field.onChange}
									error={fieldState.error}
									required
								/>
							)}
						/>
						<S.ResendEmailLink>
							<RectangularButton
								disabled={isSubmitting}
								colorVariant="blue"
								onClick={handleResendCodeValidation}
							>
								Enviar novamente
							</RectangularButton>
						</S.ResendEmailLink>
					</S.VerificationCodeWrapper>
				</S.InputsWrapper>

				<S.Actions>
					<RectangularButton colorVariant="blue" onClick={setPrevStep} fullWidth>
						<FiCornerUpLeft fontSize="2rem" />
						<span>Voltar para a tela anterior</span>
					</RectangularButton>
				</S.Actions>
			</S.Form>
		</S.Wrapper>
	);
};

StepTwo.propTypes = {
	activeStep: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	}).isRequired,
	setNextStep: PropTypes.func.isRequired,
	setPrevStep: PropTypes.func.isRequired,
	userData: PropTypes.shape({
		email: PropTypes.string.isRequired,
	}).isRequired,
	updateUserData: PropTypes.func.isRequired,
};

export default StepTwo;
