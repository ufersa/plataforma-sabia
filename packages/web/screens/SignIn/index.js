import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { RiErrorWarningLine } from 'react-icons/ri';

import { Link } from '../../components/Link';
import { InputField } from '../../components/Form';
import { RectangularButton } from '../../components/Button';
import { internal as internalPages } from '../../utils/enums/pages.enum';
import { toast } from '../../components/Toast';
import * as S from './styles';
import { useAuth } from '../../hooks';

const SignIn = ({ redirect }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(null);
	const form = useForm();
	const router = useRouter();
	const { login } = useAuth();

	const handleSubmit = async ({ email, password }) => {
		setIsSubmitting(true);
		setError(null);

		const response = await login(email, password);

		if (response.error) {
			if (response.error.error_code === 'UNVERIFIED_EMAIL') {
				toast.error(`${response.error.message}`);
				router.push(internalPages.confirm_account);
				return;
			}
			setIsSubmitting(false);
			setError(response.error.message);
			return;
		}

		router.push(redirect || internalPages.home);
	};

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
			<S.FormWrapper onSubmit={form.handleSubmit(handleSubmit)}>
				<S.FormContent>
					<S.Title>Faça login com sua conta</S.Title>
					{!!error && (
						<S.Error>
							<RiErrorWarningLine />
							{error}
						</S.Error>
					)}
					<S.InputsWrapper>
						<InputField
							form={form}
							name="email"
							label="E-mail"
							placeholder="Digite o seu e-mail"
							variant="lightRounded"
						/>
						<InputField
							form={form}
							name="password"
							type="password"
							label="Senha"
							placeholder="Digite a sua senha"
							variant="lightRounded"
						/>
					</S.InputsWrapper>
					<S.Actions>
						<Link
							href={internalPages.home}
							alignSelf="flex-end"
							variant="normal"
							color="blue"
						>
							Esqueceu sua senha?
						</Link>
						<RectangularButton
							variant="round"
							colorVariant="green"
							type="submit"
							disabled={isSubmitting}
							fullWidth
							uppercase
							boldText
						>
							{isSubmitting ? 'Aguarde...' : 'Entrar'}
						</RectangularButton>
					</S.Actions>
				</S.FormContent>
				<S.Register>
					<span>Não possui conta? </span>
					<Link href={internalPages.register} color="blue">
						Cadastre-se agora mesmo
					</Link>
				</S.Register>
			</S.FormWrapper>
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
