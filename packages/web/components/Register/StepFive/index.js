import PropTypes from 'prop-types';
import Link from 'next/link';

import { RectangularButton } from '../../Button';

import { Actions } from '../styles';
import * as S from './styles';

const StepFive = ({ activeStep }) => {
	return (
		<>
			<S.FinishContainer>
				<img src="/logo.svg" alt="Plataforma Sabiá" />

				<S.FinishTitle>{activeStep.title}</S.FinishTitle>
				<S.FinishSubtitle>{activeStep.subtitle}</S.FinishSubtitle>
			</S.FinishContainer>
			<Actions>
				<Link href="/" passHref>
					<RectangularButton as="a" variant="round" colorVariant="orange">
						Finalizar
					</RectangularButton>
				</Link>
			</Actions>
		</>
	);
};

StepFive.propTypes = {
	activeStep: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
	}).isRequired,
};

export default StepFive;
