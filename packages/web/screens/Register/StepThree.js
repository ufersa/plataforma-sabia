import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowRight } from 'react-icons/fi';
import { RectangularButton } from '../../components/Button';
import { VerificationCodeField } from '../../components/Form';
import { toast } from '../../components/Toast';
import { accountConfirmation, emailConfirmation } from '../../services';

import * as S from './styles';

const verificationCodeFieldsNumber = 6;
const verificationCodeDefaultValue = Array(verificationCodeFieldsNumber).fill('');

const StepThree = ({ activeStep, setNextStep, userData }) => {
	const [verificationCodeValues, setVerificationCodeValues] = useState(
		verificationCodeDefaultValue,
	);
	const verificationCodeRef = useRef();
	const [isFetching, setIsFetching] = useState(false);
	const form = useForm();

	useEffect(() => {
		if (verificationCodeRef.current) {
			verificationCodeRef.current.focus();
		}
	}, []);

	const handleSubmit = useCallback(
		async (values) => {
			setIsFetching(true);
			const verificationCode = values.join('');

			const response = await accountConfirmation(verificationCode, userData.email);

			if (response?.error) {
				setVerificationCodeValues(verificationCodeDefaultValue);
				const errorMessage =
					typeof response.error.message === 'string'
						? response.error.message
						: response.error.message[0].message;

				toast.error(
					errorMessage ||
						'Ocorreu um erro para validar seu registro. Tente novamente em alguns instantes...',
				);
				setIsFetching(false);
				return;
			}

			setNextStep();
		},
		[userData.email, setNextStep],
	);

	const handleResendEmailConfirmation = async () => {
		setIsFetching(true);
		const response = await emailConfirmation(userData.email);

		if (response?.error) {
			toast.error(
				response.error.message[0].message ||
					'Ocorreu um erro para efetuar seu registro. Recarregue a página e tente novamente...',
			);
			setIsFetching(false);
			return;
		}

		if (response.success) {
			toast.success('E-mail de confirmação enviado com sucesso!');
		}

		setIsFetching(false);
	};

	return (
		<S.Form onSubmit={form.handleSubmit(handleSubmit)}>
			<S.StepTitle>{activeStep.title}</S.StepTitle>
			<S.StepSubtitle>{activeStep.subtitle}</S.StepSubtitle>
			<S.StepInfo>
				Digite abaixo o código de <strong>6 dígitos</strong> que enviamos para o seu e-mail.
			</S.StepInfo>
			<S.VerificationCodeWrapper>
				<VerificationCodeField
					ref={verificationCodeRef}
					onCompleted={handleSubmit}
					fieldsNumber={verificationCodeFieldsNumber}
					values={verificationCodeValues}
					setValues={setVerificationCodeValues}
				/>
			</S.VerificationCodeWrapper>

			<S.ResendEmailLink>
				<RectangularButton
					disabled={isFetching}
					colorVariant="blue"
					onClick={handleResendEmailConfirmation}
				>
					Enviar novamente
				</RectangularButton>
			</S.ResendEmailLink>
			<S.FloatingAction>
				<RectangularButton
					disabled={isFetching}
					variant="round"
					colorVariant="green"
					type="submit"
				>
					Validar
					<FiArrowRight fontSize="2rem" />
				</RectangularButton>
			</S.FloatingAction>
		</S.Form>
	);
};

StepThree.propTypes = {
	activeStep: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
	}).isRequired,
	setNextStep: PropTypes.func.isRequired,
	userData: PropTypes.shape({
		email: PropTypes.string.isRequired,
	}).isRequired,
};

export default StepThree;
