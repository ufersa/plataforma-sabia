import PropTypes from 'prop-types';
import { MdEmail } from 'react-icons/md';
import { RectangularButton } from '../../Button';

import { Form, StepTitle, StepSubtitle } from '../styles';
import * as S from './styles';

const StepOne = ({ activeStep, setNextStep }) => {
	return (
		<Form>
			<StepTitle>{activeStep.title}</StepTitle>
			<StepSubtitle>{activeStep.subtitle}</StepSubtitle>

			<S.RegisterTypeTitle>
				Como você quer
				<p>realizar o cadastro?</p>
			</S.RegisterTypeTitle>

			<RectangularButton variant="round" colorVariant="green" onClick={setNextStep} fullWidth>
				<MdEmail fontSize="2rem" />
				Utilizando o e-mail
			</RectangularButton>
		</Form>
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
