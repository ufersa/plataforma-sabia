import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RectangularButton } from '../Button';
import { internal as internalPages } from '../../utils/enums/pages.enum';
import * as S from './styles';
import { useAuth } from '../../hooks';
import { toast } from '../Toast';

const StepFour = ({ activeStep, userData }) => {
	const { login } = useAuth();
	const router = useRouter();

	useEffect(() => {
		const doLogin = async () => {
			const response = await login(userData.email, userData.password);

			if (response.error) {
				toast.info(
					'Não conseguimos autenticar seu usuário, por favor faça login novamente',
				);
				router.push(internalPages.signIn);
			}
		};

		doLogin();
		// We just want to login once
		// None of the dependencies needs to update
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<S.Wrapper>
			<S.Form>
				<S.StepTitle>{activeStep.title}</S.StepTitle>
				<S.StepSubtitle smallFontSize>{activeStep.subtitle}</S.StepSubtitle>

				<S.Actions>
					<Link href={internalPages.home} passHref>
						<RectangularButton
							colorVariant="orange"
							variant="round"
							type="submit"
							as="a"
							fullWidth
						>
							Ir para a página principal
						</RectangularButton>
					</Link>
				</S.Actions>
			</S.Form>
		</S.Wrapper>
	);
};

StepFour.propTypes = {
	activeStep: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	}).isRequired,
	userData: PropTypes.shape({
		email: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
	}).isRequired,
};

export default StepFour;
