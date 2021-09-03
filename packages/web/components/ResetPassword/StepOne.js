import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiCornerUpLeft } from 'react-icons/fi';
import { useState } from 'react';
import { RectangularButton } from '../Button';
import { Error, InputField } from '../Form';
import { useAuth } from '../../hooks';
import { internal as internalPages } from '../../utils/enums/pages.enum';
import * as S from './styles';

const StepOne = ({ activeStep, setNextStep, updateUserData }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const form = useForm();
	const router = useRouter();
	const { requestPasswordReset } = useAuth();

	const handleSubmit = async ({ email }) => {
		setIsSubmitting(true);
		setError('');

		const response = await requestPasswordReset({ email });

		if (response.error) {
			setError(response.error.message?.[0]?.message || response.error.message);
			setIsSubmitting(false);
			return;
		}

		updateUserData({ email });
		setNextStep();
	};

	return (
		<S.Wrapper>
			<S.Form onSubmit={form.handleSubmit(handleSubmit)}>
				<S.StepTitle>{activeStep.title}</S.StepTitle>
				<S.StepSubtitle>{activeStep.subtitle}</S.StepSubtitle>

				{!!error && <Error message={error} />}

				<S.InputsWrapper>
					<InputField
						form={form}
						validation={{ required: true }}
						name="email"
						label="E-mail"
						placeholder="Digite o seu e-mail"
						variant="lightRounded"
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
						{isSubmitting ? (
							'Aguarde...'
						) : (
							<>
								Enviar e-mail
								<FiArrowRight fontSize="2rem" />
							</>
						)}
					</RectangularButton>
					<RectangularButton
						colorVariant="blue"
						onClick={() => router.push(internalPages.signIn)}
						fullWidth
					>
						<FiCornerUpLeft fontSize="2rem" />
						<span>Voltar para a tela de login</span>
					</RectangularButton>
				</S.Actions>
			</S.Form>
		</S.Wrapper>
	);
};

StepOne.propTypes = {
	activeStep: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	}).isRequired,
	setNextStep: PropTypes.func.isRequired,
	updateUserData: PropTypes.func.isRequired,
};

export default StepOne;
