import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { RectangularButton } from '../../components/Button';
import { InputField } from '../../components/Form';

import * as S from './styles';

const StepTwo = ({ activeStep, setPrevStep }) => {
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordConfirm: '',
			privacyTerms: false,
		},
	});

	const handleSubmit = () => {};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)}>
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
					validation={{ required: true }}
				/>
			</S.InputsWrapper>

			<S.Actions>
				<RectangularButton colorVariant="silver" onClick={setPrevStep}>
					<FiArrowLeft fontSize="2rem" />
					Voltar
				</RectangularButton>
				<RectangularButton variant="round" colorVariant="green" type="submit">
					Continuar
					<FiArrowRight fontSize="2rem" />
				</RectangularButton>
			</S.Actions>
		</form>
	);
};

StepTwo.propTypes = {
	activeStep: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
	}).isRequired,
	setPrevStep: PropTypes.func.isRequired,
};

export default StepTwo;
