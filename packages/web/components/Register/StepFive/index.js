import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

import { RectangularButton } from '../../Button';

import * as S from './styles';

const StepFive = ({ activeStep }) => {
	return (
		<>
			<S.FinishWrapper>
				<S.FinishContainer>
					<S.LogoWrapper>
						<Image
							src="/logo.svg"
							alt="Plataforma Sabiá"
							width={165}
							height={48}
							layout="responsive"
						/>
					</S.LogoWrapper>

					<S.FinishTitle>{activeStep.title}</S.FinishTitle>
					<S.FinishSubtitle>{activeStep.subtitle}</S.FinishSubtitle>

					<Link href="/" passHref>
						<RectangularButton as="a" variant="round" colorVariant="green">
							Ir para a página principal
							<FiArrowRight fontSize="2rem" />
						</RectangularButton>
					</Link>
				</S.FinishContainer>
			</S.FinishWrapper>

			<S.Actions>
				<Link href="/" passHref>
					<RectangularButton as="a" variant="round" colorVariant="orange">
						Finalizar
					</RectangularButton>
				</Link>
			</S.Actions>
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
