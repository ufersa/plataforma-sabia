import PropTypes from 'prop-types';
import Image from 'next/image';

import { Link } from '../../components/Link';
import SignInForm from '../../components/SignInForm';
import { internal as internalPages } from '../../utils/enums/pages.enum';
import * as S from './styles';

const SignIn = ({ redirect }) => {
	return (
		<S.Container>
			<S.Aside>
				<S.LogoWrapper>
					<Link href={internalPages.home} passHref>
						<S.LogoImage>
							<Image src="/logo-color.svg" layout="fill" objectFit="cover" />
						</S.LogoImage>
					</Link>
				</S.LogoWrapper>
				<S.BackgroundImageWrapper>
					<Image src="/wind-turbine.svg" layout="fill" objectFit="cover" />
				</S.BackgroundImageWrapper>
			</S.Aside>
			<SignInForm redirect={redirect} />
		</S.Container>
	);
};

SignIn.propTypes = {
	redirect: PropTypes.string,
};

SignIn.defaultProps = {
	redirect: null,
};

export default SignIn;
