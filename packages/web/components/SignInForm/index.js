import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { RiErrorWarningLine } from 'react-icons/ri';

import { Link } from '../Link';
import { InputField } from '../Form';
import { RectangularButton } from '../Button';
import { internal as internalPages } from '../../utils/enums/pages.enum';
import { toast } from '../Toast';
import * as S from './styles';
import { useAuth } from '../../hooks';

const SignInForm = ({ redirect, inline }) => {
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

		if (!inline) router.push(redirect || internalPages.home);
	};

	return (
		<S.FormWrapper onSubmit={form.handleSubmit(handleSubmit)} data-cy="signin-form">
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
						validation={{ required: true }}
					/>
					<InputField
						form={form}
						name="password"
						type="password"
						label="Senha"
						placeholder="Digite a sua senha"
						variant="lightRounded"
						validation={{ required: true }}
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
	);
};

SignInForm.propTypes = {
	redirect: PropTypes.string,
	inline: PropTypes.bool,
};

SignInForm.defaultProps = {
	redirect: null,
	inline: false,
};

export default SignInForm;
