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
			setMessage(t('account:messages.error'));
		} else {
			setMessage(t('account:messages.userSuccessfullyUpdated'));
		}
	};

	return (
		<Container>
			<Protected>
				<UserProfile />
				<MainContentContainer>
					<Title align="left" noPadding noMargin>
						{t('account:titles.myProfile')}
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
	const { t } = useTranslation(['account']);
	return (
		<>
			<Row>
				<Cell>
					<InputField
						form={form}
						name="full_name"
						label={t('account:labels.fullName')}
						defaultValue={user.full_name}
						placeholder={t('account:placeholders.fullName')}
						validation={{ required: true }}
					/>
				</Cell>
				<Cell>
					<InputField
						form={form}
						name="email"
						label={t('account:labels.mainEmail')}
						defaultValue={user.email}
						type="email"
						placeholder={t('account:placeholders.mainEmail')}
						validation={{ required: true }}
					/>
				</Cell>
				<Cell>
					<InputField
						form={form}
						name="company"
						label={t('account:labels.institution')}
						defaultValue={user.company || ''}
						placeholder={t('account:placeholders.institution')}
						validation={{ required: true }}
					/>
				</Cell>
			</Row>
			<Row>
				<Cell>
					<PasswordContainer>
						<span>{t('account:labels.passwordChange')}</span>
						<div>
							<Cell>
								<InputField
									form={form}
									label={t('account:labels.currentPassword')}
									name="password"
									placeholder="*****"
									type="password"
								/>
							</Cell>
							<Cell>
								<InputField
									form={form}
									label={t('account:labels.newPassword')}
									name="newPassword"
									placeholder="*****"
									type="password"
								/>
							</Cell>
							<Cell>
								<InputField
									form={form}
									label={t('account:labels.confirmNewPassword')}
									name="confirmNewPassword"
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
					{loading ? t('account:labels.updatingUser') : t('account:labels.updateUser')}
				</Button>
			</Actions>
		</>
	);
};

InnerForm.propTypes = {
	form: PropTypes.shape({}),
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
