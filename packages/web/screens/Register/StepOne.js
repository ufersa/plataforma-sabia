import PropTypes from 'prop-types';
import { MdEmail } from 'react-icons/md';
import { RectangularButton } from '../../components/Button';
import * as S from './styles';

const StepOne = ({ activeStep, setNextStep }) => {
	return (
		<S.Form>
			<S.StepTitle>{activeStep.title}</S.StepTitle>
			<S.StepSubtitle>{activeStep.subtitle}</S.StepSubtitle>

			<S.RegisterTypeTitle>
				Como você quer
				<p>realizar o cadastro?</p>
			</S.RegisterTypeTitle>

			<RectangularButton variant="round" colorVariant="green" onClick={setNextStep} fullWidth>
				<MdEmail fontSize="2rem" />
				Utilizando o e-mail
			</RectangularButton>
		</S.Form>
	);
};

StepOne.propTypes = {
	activeStep: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
	}).isRequired,
	setNextStep: PropTypes.func.isRequired,
};

export default StepOne;
