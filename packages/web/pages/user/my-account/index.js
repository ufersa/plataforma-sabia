import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { InputField, Form, Actions, MaskedInputField } from '../../../components/Form';
import { Title, Cell, Row } from '../../../components/Common';
import { Button } from '../../../components/Button';
import { updateUser, updateUserPassword } from '../../../services';
import { unMask } from '../../../utils/helper';

const MyProfile = () => {
	const { user, setUser } = useAuth();
	const { t } = useTranslation(['account']);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [passwordMessage, setPasswordMessage] = useState('');
	const [passwordLoading, setPasswordLoading] = useState(false);

	const handleSubmit = async ({ cpf, zipcode, birth_date, ...data }) => {
		setLoading(true);
		const result = await updateUser(user.id, {
			data,
			cpf: unMask(cpf),
			zipCode: unMask(zipcode),
			birthDate: unMask(birth_date),
		});
		setLoading(false);

		if (result.error) {
			if (result.error.error_code === 'VALIDATION_ERROR') {
				setMessage(result.error.message[0].message);
			} else {
				setMessage(t('account:messages.error'));
			}
		} else {
			setUser(result);
			setMessage(t('account:messages.userSuccessfullyUpdated'));
		}
	};

	const handlePasswordSubmit = async ({ currentPassword, newPassword, confirmNewPassword }) => {
		setPasswordLoading(true);

		if (newPassword !== confirmNewPassword) {
			setPasswordMessage(t('account:messages.newPasswordError'));
			setPasswordLoading(false);
			return;
		}

		const result = await updateUserPassword({ currentPassword, newPassword });
		setPasswordLoading(false);

		if (result.error) {
			if (result.error.error_code === 'PASSWORD_NOT_MATCH') {
				setPasswordMessage(result.error.message);
			} else {
				setPasswordMessage(t('account:messages.error'));
			}
		} else {
			setPasswordMessage(t('account:messages.passwordSuccessfullyUpdated'));
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
							<CommonDataForm user={user} message={message} loading={loading} />
						</Form>
						<Form onSubmit={handlePasswordSubmit}>
							<PasswordForm message={passwordMessage} loading={passwordLoading} />
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

const CommonDataForm = ({ form, user, message, loading }) => {
	const { t } = useTranslation(['account']);
	return (
		<>
			<Row>
				<Cell col={4}>
					<InputField
						form={form}
						name="full_name"
						label={t('account:labels.fullName')}
						defaultValue={user.full_name}
						placeholder={t('account:placeholders.fullName')}
						validation={{ required: true }}
					/>
				</Cell>
				<Cell col={3}>
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
				<Cell col={3}>
					<InputField
						form={form}
						name="secondary_email"
						type="email"
						label={t('account:labels.alternativeEmail')}
						defaultValue={user.secondary_email || ''}
						placeholder={t('account:placeholders.alternativeEmail')}
					/>
				</Cell>
			</Row>
			<Row>
				<Cell col={3}>
					<InputField
						form={form}
						name="company"
						label={t('account:labels.institution')}
						defaultValue={user.company || ''}
						placeholder={t('account:placeholders.institution')}
					/>
				</Cell>
				<Cell col={2}>
					<MaskedInputField
						form={form}
						name="cpf"
						label={t('account:labels.cpf')}
						defaultValue={user.cpf}
						placeholder={t('account:placeholders.cpf')}
						mask="999.999.999-99"
					/>
				</Cell>
				<Cell col={2}>
					<MaskedInputField
						form={form}
						name="birth_date"
						label={t('account:labels.birthDate')}
						defaultValue={user.birth_date}
						placeholder={t('account:placeholders.birthDate')}
						mask="99/99/9999"
					/>
				</Cell>
				<Cell col={2}>
					<InputField
						form={form}
						name="phone_number"
						label={t('account:labels.phoneNumber')}
						defaultValue={user.phone_number || ''}
						placeholder={t('account:placeholders.phoneNumber')}
					/>
				</Cell>
				<Cell col={2}>
					<InputField
						form={form}
						name="lattes_id"
						type="number"
						label={t('account:labels.lattesId')}
						defaultValue={user.lattes_id || ''}
						placeholder={t('account:placeholders.lattesId')}
					/>
				</Cell>
			</Row>
			<Row>
				<Cell maxWidth={20}>
					<MaskedInputField
						form={form}
						name="zipcode"
						label={t('account:labels.zipCode')}
						defaultValue={user.zipcode}
						placeholder={t('account:placeholders.zipCode')}
						mask="99999-999"
					/>
				</Cell>
			</Row>
			<Row>
				<Cell col={4}>
					<InputField
						form={form}
						name="address"
						label={t('account:labels.address')}
						defaultValue={user.address || ''}
						placeholder={t('account:placeholders.address')}
					/>
				</Cell>
				<Cell col={3}>
					<InputField
						form={form}
						name="address2"
						label={t('account:labels.address2')}
						defaultValue={user.address2 || ''}
						placeholder={t('account:placeholders.address2')}
					/>
				</Cell>
				<Cell col={3}>
					<InputField
						form={form}
						name="district"
						label={t('account:labels.district')}
						defaultValue={user.district || ''}
						placeholder={t('account:placeholders.district')}
					/>
				</Cell>
			</Row>
			<Row>
				<Cell col={4}>
					<InputField
						form={form}
						name="city"
						label={t('account:labels.city')}
						defaultValue={user.city || ''}
						placeholder={t('account:placeholders.city')}
					/>
				</Cell>
				<Cell col={3}>
					<InputField
						form={form}
						name="state"
						label={t('account:labels.state')}
						defaultValue={user.state || ''}
						placeholder={t('account:placeholders.state')}
					/>
				</Cell>
				<Cell col={3}>
					<InputField
						form={form}
						name="country"
						label={t('account:labels.country')}
						defaultValue={user.country || ''}
						placeholder={t('account:placeholders.country')}
					/>
				</Cell>
			</Row>
			<Row>
				<Cell align="center">
					<p>{message}</p>
				</Cell>
			</Row>
			<Actions center>
				<Button type="submit" disabled={loading}>
					{loading ? t('account:labels.updatingUser') : t('account:labels.updateUser')}
				</Button>
			</Actions>
		</>
	);
};

CommonDataForm.propTypes = {
	form: PropTypes.shape({}),
	user: PropTypes.shape({
		full_name: PropTypes.string,
		company: PropTypes.string,
		email: PropTypes.string,
		secondary_email: PropTypes.string,
		cpf: PropTypes.string,
		birth_date: PropTypes.string,
		phone_number: PropTypes.string,
		lattes_id: PropTypes.string,
		zipcode: PropTypes.string,
		address: PropTypes.string,
		address2: PropTypes.string,
		district: PropTypes.string,
		city: PropTypes.string,
		state: PropTypes.string,
		country: PropTypes.string,
	}),
	message: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
};

CommonDataForm.defaultProps = {
	form: {},
	user: {},
};

const PasswordForm = ({ form, message, loading }) => {
	const { t } = useTranslation(['account']);
	return (
		<>
			<Row>
				<Cell>
					<PasswordContainer>
						<span>{t('account:labels.passwordChange')}</span>
						<div>
							<Cell>
								<InputField
									form={form}
									label={t('account:labels.currentPassword')}
									name="currentPassword"
									placeholder="*****"
									type="password"
									validation={{ required: true }}
								/>
							</Cell>
							<Cell>
								<InputField
									form={form}
									label={t('account:labels.newPassword')}
									name="newPassword"
									placeholder="*****"
									type="password"
									validation={{ required: true }}
								/>
							</Cell>
							<Cell>
								<InputField
									form={form}
									label={t('account:labels.confirmNewPassword')}
									name="confirmNewPassword"
									placeholder="*****"
									type="password"
									validation={{ required: true }}
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
				<Button type="submit" disabled={loading}>
					{loading
						? t('account:labels.updatingPassword')
						: t('account:labels.updatePassword')}
				</Button>
			</Actions>
		</>
	);
};

PasswordForm.propTypes = {
	form: PropTypes.shape({}),
	message: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
};

PasswordForm.defaultProps = {
	form: {},
};

const Container = styled.div`
	display: flex;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.colors.whiteSmoke};
	padding: 3rem 4rem 6rem;

	> section:first-child {
		margin-right: 4rem;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 2rem;

		> section:first-child {
			margin-right: 0;
		}
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
	${({ theme: { screens, colors } }) => css`
		min-height: 80vh;
		background-color: ${colors.white};
		padding: 2rem;

		@media (max-width: ${screens.medium}px) {
			padding: 0;
		}
	`};
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

		@media (max-width: ${({ theme }) => theme.screens.large}px) {
			margin: 1rem 0;
		}
	}
`;

export default MyProfile;
