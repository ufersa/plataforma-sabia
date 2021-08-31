import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { Controller, useForm, useWatch } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { RectangularButton } from '../../Button';
import { InputField, VerificationCodeField } from '../../Form';
import { toast } from '../../Toast';
import { accountConfirmation, emailConfirmation } from '../../../services';

import { Form, StepTitle, StepSubtitle, StepInfo, Actions } from '../styles';
import { internal as internalPages } from '../../../utils/enums/pages.enum';
import * as S from './styles';

const StepThree = ({ activeStep, setNextStep, userData, updateUserData }) => {
	const verificationCodeRef = useRef();
	const [isFetching, setIsFetching] = useState(false);
	const form = useForm({
		defaultValues: { email: '', verificationCode: Array(6).fill('') },
		reValidateMode: 'onSubmit',
	});
	const verificationCode = useWatch({
		control: form.control,
		name: 'verificationCode',
	});
	const { t } = useTranslation(['error']);
	const router = useRouter();
	const shouldShowEmailField = router.pathname === internalPages.confirm_account;

	useEffect(() => {
		if (shouldShowEmailField) {
			form.setFocus('email');
			return;
		}

		if (verificationCodeRef.current) {
			verificationCodeRef.current.focus();
		}

		// We only want this to run when component is mounted
		// react-hook-form funcs is already memoized
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async (values) => {
		setIsFetching(true);

		const response = await accountConfirmation(
			values.verificationCode.join(''),
			userData.email || values.email,
		);

		if (response?.error) {
			const errorMessage =
				typeof response.error.message === 'string'
					? response.error.message
					: response.error.message[0].message;

			toast.error(
				errorMessage ||
					'Ocorreu um erro para validar seu registro. Tente novamente em alguns instantes...',
			);
			setIsFetching(false);
			form.reset();

			if (shouldShowEmailField) {
				form.setFocus('email');
			} else {
				verificationCodeRef.current.focus();
			}
			return;
		}

		updateUserData(response);
		setNextStep();
	};

	useEffect(() => {
		const isAllFilled = verificationCode.every((code) => code.length > 0);

		if (isAllFilled && !shouldShowEmailField) {
			form.handleSubmit(handleSubmit)();
		}
		// react-hook-form funcs is already memoized
		// Everytime `verificationCode` changes, `shouldShowEmailField` also change, so we don't need it here
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [verificationCode]);

	const handleResendEmailConfirmation = async () => {
		const { email } = form.getValues();

		if (!userData.email && !email) {
			form.setError('email', { message: t('error:requiredField') });
			return;
		}

		form.clearErrors();
		setIsFetching(true);
		const response = await emailConfirmation(userData.email || email);

		if (response?.error) {
			toast.error(
				response.error.message[0].message ||
					'Ocorreu um erro para efetuar seu registro. Recarregue a página e tente novamente...',
			);
			setIsFetching(false);
			return;
		}

		if (response.success) {
			toast.success(
				'Caso o e-mail informado corresponda a um usuário cadastrado, enviaremos o código de verificação para você',
			);

			if (!userData.email && !!email) updateUserData({ email });
		}

		setIsFetching(false);
	};

	return (
		<Form onSubmit={form.handleSubmit(handleSubmit)}>
			<StepTitle>{activeStep.title}</StepTitle>
			<StepSubtitle>{activeStep.subtitle}</StepSubtitle>
			<StepInfo>
				{shouldShowEmailField ? (
					<>
						Digite abaixo seu e-mail e o código de <strong>6 dígitos</strong> para
						validar sua conta
					</>
				) : (
					<>
						Digite abaixo o código de <strong>6 dígitos</strong> que enviamos para o seu
						e-mail.
					</>
				)}
			</StepInfo>
			<S.InputsWrapper>
				{shouldShowEmailField && (
					<InputField
						name="email"
						label="E-mail"
						placeholder="Digite seu e-mail"
						variant="lightRounded"
						form={form}
						validation={{ required: true }}
					/>
				)}
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
								label={shouldShowEmailField ? 'Código de verificação' : ''}
								error={fieldState.error}
								required
							/>
						)}
					/>
					<S.ResendEmailLink>
						<RectangularButton
							disabled={isFetching}
							colorVariant="blue"
							onClick={handleResendEmailConfirmation}
						>
							Enviar novamente
						</RectangularButton>
					</S.ResendEmailLink>
				</S.VerificationCodeWrapper>
			</S.InputsWrapper>

			<Actions>
				<RectangularButton
					disabled={isFetching}
					variant="round"
					colorVariant="green"
					type="submit"
				>
					Validar
					<FiArrowRight fontSize="2rem" />
				</RectangularButton>
			</Actions>
		</Form>
	);
};

StepThree.propTypes = {
	activeStep: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
	}).isRequired,
	setNextStep: PropTypes.func.isRequired,
	userData: PropTypes.shape({
		email: PropTypes.string,
	}).isRequired,
	updateUserData: PropTypes.func.isRequired,
};

export default StepThree;
