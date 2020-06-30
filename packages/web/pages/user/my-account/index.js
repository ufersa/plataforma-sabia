import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { InputField, Form, Actions } from '../../../components/Form';
import { Title, Cell, Row } from '../../../components/Common';
import { Button } from '../../../components/Button';
import { updateUser } from '../../../services';

const MyProfile = () => {
	const { user } = useAuth();
	const { t } = useTranslation(['account']);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async ({ full_name, email, company }) => {
		setLoading(true);
		const result = await updateUser(user.id, { full_name, email, company });
		setLoading(false);
		if (result.error) {
			setMessage('Um erro ocorreu');
		} else {
			setMessage('Alteração realizada com sucesso');
		}
	};

	return (
		<Container>
			<Protected>
				<UserProfile />
				<MainContentContainer>
					<Title align="left" noPadding noMargin>
						{t('account:myProfile')}
					</Title>
					<MainContent>
						<Form onSubmit={handleSubmit}>
							<InnerForm user={user} message={message} loading={loading} />
						</Form>
					</MainContent>
				</MainContentContainer>
			</Protected>
		</Container>
	);
};

MyProfile.getInitialProps = async () => {
	return {
		namespacesRequired: ['account', 'profile'],
	};
};

const InnerForm = ({ form, user, message, loading }) => {
	return (
		<>
			<Row>
				<Cell>
					<InputField
						form={form}
						name="full_name"
						label="Nome completo"
						defaultValue={user.full_name}
						placeholder="Seu nome completo"
						validation={{ required: true }}
					/>
				</Cell>
				<Cell>
					<InputField
						form={form}
						name="email"
						label="E-mail principal"
						defaultValue={user.email}
						type="email"
						placeholder="email@principal.com"
						validation={{ required: true }}
					/>
				</Cell>
				<Cell>
					<InputField
						form={form}
						name="company"
						label="Instituição"
						defaultValue={user.company || ''}
						placeholder="Nome da sua instituição"
						validation={{ required: true }}
					/>
				</Cell>
			</Row>
			<Row>
				<Cell>
					<PasswordContainer>
						<span>Alteração de Senha</span>
						<div>
							<Cell>
								<InputField
									form={form}
									label="Senha Atual"
									name="password"
									placeholder="*****"
									type="password"
								/>
							</Cell>
							<Cell>
								<InputField
									form={form}
									label="Nova senha"
									name="newPassword"
									placeholder="*****"
									type="password"
								/>
							</Cell>
							<Cell>
								<InputField
									form={form}
									label="Repita nova senha"
									name="repeatedNewPassword"
									placeholder="*****"
									type="password"
								/>
							</Cell>
						</div>
					</PasswordContainer>
				</Cell>
			</Row>
			<Row>
				<Cell align="center">
					<p>{message}</p>
				</Cell>
			</Row>
			<Actions center>
				<Button type="submit" disabled={loading} variant="success">
					{/* {loading ? t('common:wait') : t('common:register')} */}
					{loading ? 'Salvando...' : 'Salvar'}
				</Button>
			</Actions>
		</>
	);
};

InnerForm.propTypes = {
	form: PropTypes.shape({
		watch: PropTypes.func,
		getValues: PropTypes.func,
		setValue: PropTypes.func,
	}),
	user: PropTypes.shape({
		full_name: PropTypes.string,
		company: PropTypes.string,
		email: PropTypes.string,
	}),
	message: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
};

InnerForm.defaultProps = {
	form: {},
	user: {},
};

const Container = styled.div`
	display: flex;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.colors.whiteSmoke};
	padding: 3rem 4rem 6rem;

	> section:first-child {
		margin-right: 4rem;
	}

	@media screen and (max-width: 950px) {
		flex-direction: column;

		button {
			margin-bottom: 1rem;
		}
	}
`;

const MainContentContainer = styled.section`
	width: 100%;
`;

const MainContent = styled.div`
	min-height: 80vh;
	background-color: ${({ theme }) => theme.colors.white};
	padding: 2rem;
`;

const PasswordContainer = styled.div`
	padding: 1rem;
	background-color: ${({ theme }) => theme.colors.gray98};

	> div {
		display: flex;

		@media (max-width: ${({ theme }) => theme.screens.large}px) {
			flex-direction: column;
		}
	}

	span {
		display: block;
		margin: 0 0 1rem 1rem;
		color: ${({ theme }) => theme.colors.primary};
		font-weight: bold;
	}
`;

export default MyProfile;
