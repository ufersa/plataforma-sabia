import PropTypes from 'prop-types';
import Link from 'next/link';

import { RectangularButton } from '../../components/Button';
import * as S from './styles';

const StepFive = ({ activeStep }) => {
	return (
		<>
			<S.FinishContainer>
				<img src="/logo.svg" alt="Plataforma Sabiá" />

				<S.FinishTitle>{activeStep.title}</S.FinishTitle>
				<S.FinishSubtitle>{activeStep.subtitle}</S.FinishSubtitle>
			</S.FinishContainer>
			<S.FloatingAction>
				<Link href="/" passHref>
					<RectangularButton as="a" variant="round" colorVariant="orange">
						Finalizar
					</RectangularButton>
				</Link>
			</S.FloatingAction>
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
