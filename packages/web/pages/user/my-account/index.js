import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FiEdit3 } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { useAuth, useModal } from '../../../hooks';
import { UserProfile, UserSpecialities, S } from '../../../components/UserProfile';
import { Protected } from '../../../components/Authorization';
import HeaderProfile from '../../../components/HeaderProfile';
import {
	Form,
	Actions,
	InputField,
	CheckBoxField,
	MaskedInputField,
	SelectField,
} from '../../../components/Form';
import { Cell, Row } from '../../../components/Common';
import Loading from '../../../components/Loading';
import {
	unMask,
	stringToDate,
	dateToString,
	mapArrayOfObjectToSelect,
	getInstitutionLabel,
} from '../../../utils/helper';
import { STATES } from '../../../utils/enums/states.enum';
import { updateUser, updateUserPassword, getInstitutions } from '../../../services';
import { maskPatterns, replaceWithMask } from '../../../utils/masks';

const MyProfile = () => {
	const { user, setUser } = useAuth();
	const { t } = useTranslation(['account']);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [passwordMessage, setPasswordMessage] = useState('');
	const [passwordLoading, setPasswordLoading] = useState(false);

	const handleSubmit = async ({
		cpf,
		birth_date,
		phone_number,
		zipcode,
		institution_id,
		state,
		knowledge_area,
		...data
	}) => {
		setLoading(true);

		const params = {
			...data,
			cpf: unMask(cpf) ?? '',
			phone_number: unMask(phone_number) ?? '',
			birth_date: stringToDate(birth_date) ?? '',
			zipcode: unMask(zipcode) ?? '',
			state: state?.value,
			institution_id: institution_id?.value,
			areas:
				knowledge_area?.map((area) => {
					const filtered = area.filter(Boolean);
					return filtered[filtered.length - 1]?.value;
				}) || [],
		};

		const result = await updateUser(user.id, params);

		setLoading(false);

		if (result?.error) {
			if (result?.error?.error_code === 'VALIDATION_ERROR') {
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

		if (result?.error) {
			if (result?.error?.error_code === 'PASSWORD_NOT_MATCH') {
				setPasswordMessage(result.error.message);
			} else {
				setPasswordMessage(t('account:messages.error'));
			}
		} else {
			setPasswordMessage(t('account:messages.passwordSuccessfullyUpdated'));
		}
	};

	return (
		<S.Container>
			<Protected>
				<UserProfile />
				<S.MainContentContainer>
					<HeaderProfile />
					<S.MainContent>
						<Form onSubmit={handleSubmit}>
							<CommonDataForm user={user} message={message} loading={loading} />
						</Form>
						<Form onSubmit={handlePasswordSubmit}>
							<PasswordForm message={passwordMessage} loading={passwordLoading} />
						</Form>
					</S.MainContent>
				</S.MainContentContainer>
			</Protected>
		</S.Container>
	);
};

MyProfile.getInitialProps = async () => {
	return {
		namespacesRequired: ['account', 'profile'],
	};
};

const CommonDataForm = ({ form, user, message, loading }) => {
	const { setValue, register } = form;
	const { t } = useTranslation(['account']);
	const { openModal } = useModal();
	const [institutionsLoading, setInstitutionsLoading] = useState(true);
	const [isResearcher, setIsResearcher] = useState(Boolean(user.researcher));
	const [institutions, setInstitutions] = useState([]);
	const [userAreas, setUserAreas] = useState(user?.areas || []);
	const [hasAreasLoading, setHasAreasLoading] = useState([true]);
	const areaKeys = ['great_area_id', 'area_id', 'sub_area_id', 'speciality_id'];
	const maxAreaNumber = 4;
	const emptyArea = {
		great_area_id: null,
		area_id: null,
		sub_area_id: null,
		speciality_id: null,
	};

	const setCurrentUserInstitution = useCallback(
		async (data) => {
			const userInstitution = data.find(
				(institution) => institution.id === user.institution_id,
			);

			if (userInstitution) {
				setValue('institution_id', {
					label: getInstitutionLabel(userInstitution),
					value: userInstitution.id,
				});
			}
		},
		[setValue, user.institution_id],
	);

	const loadInstitutions = useCallback(async () => {
		const { data } = await getInstitutions({ perPage: 100, order: 'desc' });
		setInstitutions(data);
		await setCurrentUserInstitution(data);
		setInstitutionsLoading(false);
	}, [setCurrentUserInstitution]);

	useEffect(() => {
		loadInstitutions();
	}, [loadInstitutions]);

	useEffect(() => {
		register('researcher');
		setValue('researcher', isResearcher);
		let newAreaValue;

		if (isResearcher) {
			newAreaValue = userAreas.length ? [...userAreas] : [emptyArea];
		} else {
			newAreaValue = [];
		}

		setUserAreas(newAreaValue);
		setValue('areas', newAreaValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isResearcher]);

	return (
		<>
			<h3>Dados pessoais</h3>
			<Row>
				<Cell col={4}>
					<InputField
						form={form}
						name="full_name"
						label={t('account:labels.fullName')}
						defaultValue={user.full_name}
						placeholder={t('account:placeholders.fullName')}
						validation={{ required: true }}
						variant="gray"
					/>
				</Cell>
				<Cell col={3}>
					<Row>
						<InputField
							form={form}
							name="email"
							label={t('account:labels.mainEmail')}
							defaultValue={user.email}
							type="email"
							placeholder={t('account:placeholders.mainEmail')}
							disabled="disabled"
							variant="gray"
							wrapperCss={S.inputEmailWrapperCss}
						/>
						<S.ButtonChangeEmail
							type="button"
							onClick={() => openModal('updateEmail', {}, { customModal: true })}
						>
							<FiEdit3 /> Alterar
						</S.ButtonChangeEmail>
					</Row>
				</Cell>
			</Row>
			<Row>
				<Cell col={4}>
					<MaskedInputField
						form={form}
						name="cpf"
						label={t('account:labels.cpf')}
						placeholder={t('account:placeholders.cpf')}
						variant="gray"
						defaultValue={replaceWithMask(user?.cpf, 'cpf')}
						pattern={maskPatterns.cpf.pattern}
						mask={maskPatterns.cpf.stringMask}
					/>
				</Cell>
				<Cell col={4}>
					<MaskedInputField
						form={form}
						name="birth_date"
						label={t('account:labels.birthDate')}
						placeholder={t('account:placeholders.birthDate')}
						variant="gray"
						defaultValue={replaceWithMask(
							dateToString(user?.birth_date),
							'brazilianDate',
						)}
						pattern={maskPatterns.brazilianDate.pattern}
						mask={maskPatterns.brazilianDate.stringMask}
					/>
				</Cell>
				<Cell col={4}>
					<MaskedInputField
						form={form}
						name="phone_number"
						alwaysShowMask={false}
						label={t('account:labels.phoneNumber')}
						placeholder={t('account:placeholders.phoneNumber')}
						variant="gray"
						defaultValue={replaceWithMask(user?.phone_number, 'phoneNumber')}
						maskChar={null}
						mask={maskPatterns.phoneNumber.stringMask}
						pattern={maskPatterns.phoneNumber.pattern}
						formatChars={maskPatterns.phoneNumber.formatChars}
					/>
				</Cell>
			</Row>
			<Row>
				<Cell col={4}>
					<MaskedInputField
						form={form}
						name="zipcode"
						label={t('account:labels.zipCode')}
						placeholder={t('account:placeholders.zipCode')}
						variant="gray"
						defaultValue={replaceWithMask(user?.zipcode, 'zipCode')}
						mask={maskPatterns.zipCode.stringMask}
						pattern={maskPatterns.zipCode.pattern}
					/>
				</Cell>
				<Cell col={4}>
					<InputField
						form={form}
						name="address"
						label={t('account:labels.address')}
						defaultValue={user?.address ?? ''}
						placeholder={t('account:placeholders.address')}
						variant="gray"
					/>
				</Cell>
				<Cell col={4}>
					<InputField
						form={form}
						name="address2"
						label={t('account:labels.address2')}
						defaultValue={user?.address2 ?? ''}
						placeholder={t('account:placeholders.address2')}
						variant="gray"
					/>
				</Cell>
			</Row>
			<Row>
				<Cell col={3}>
					<InputField
						form={form}
						name="district"
						label={t('account:labels.district')}
						defaultValue={user?.district ?? ''}
						placeholder={t('account:placeholders.district')}
						variant="gray"
					/>
				</Cell>
				<Cell col={3}>
					<InputField
						form={form}
						name="city"
						label={t('account:labels.city')}
						defaultValue={user?.city ?? ''}
						placeholder={t('account:placeholders.city')}
						variant="gray"
					/>
				</Cell>
				<Cell col={3}>
					<SelectField
						form={form}
						name="state"
						label={t('account:labels.state')}
						placeholder={t('account:placeholders.state')}
						variant="gray"
						options={mapArrayOfObjectToSelect(STATES, 'initials', 'initials')}
						defaultValue={{
							label: user?.state,
							value: user?.state,
						}}
					/>
				</Cell>
				<Cell col={3}>
					<InputField
						form={form}
						name="country"
						label={t('account:labels.country')}
						defaultValue={user?.country ?? ''}
						placeholder={t('account:placeholders.country')}
						variant="gray"
					/>
				</Cell>
			</Row>

			<h3>Dados Organizacionais e Acadêmicos</h3>
			<Row>
				<Cell col={9}>
					<Row align="center">
						<Cell col="auto">
							<SelectField
								isSearchable
								form={form}
								name="institution_id"
								label={t('account:labels.institution')}
								placeholder={t('account:placeholders.institution')}
								isLoading={institutionsLoading}
								variant="gray"
								options={institutions?.map((institution) => ({
									label: getInstitutionLabel(institution),
									value: institution.id,
								}))}
							/>
						</Cell>
						<S.Button
							type="button"
							variant="outlined"
							wrapperCss={S.buttonInstitutionsWrapperCss}
							onClick={() =>
								openModal(
									'createInstitutions',
									{
										onClose: () => {
											setInstitutionsLoading(true);
											loadInstitutions();
										},
									},
									{ overlayClick: false },
								)
							}
						>
							<FaPlus /> Nova Organização
						</S.Button>
					</Row>
				</Cell>
				<Cell col={3}>
					<InputField
						form={form}
						name="lattes_id"
						type="number"
						label={t('account:labels.lattesId')}
						defaultValue={user?.lattes_id ?? ''}
						placeholder={t('account:placeholders.lattesId')}
						variant="gray"
						help={
							<>
								<p>
									O ID Lattes poderá ser obtido na{' '}
									<a
										href="http://lattes.cnpq.br/"
										target="_blank"
										rel="noreferrer"
									>
										Plataforma Lattes
									</a>{' '}
									nessa parte do currículo:
								</p>
								<img
									src="/lattes.jpg"
									alt="Currículo Lattes com ID Lattes destacado"
								/>
							</>
						}
					/>
				</Cell>
			</Row>

			<h3>Áreas do conhecimento</h3>
			<Row align="center">
				<CheckBoxField
					name="researcher"
					value={isResearcher}
					label={t('account:labels.researcher')}
					onChange={setIsResearcher}
				/>
			</Row>
			<Row align="flex-start" justify="center">
				{!!isResearcher && userAreas.length <= maxAreaNumber && (
					<Loading
						loading={hasAreasLoading.some((item) => item !== false)}
						alwaysRenderChildren
					>
						{userAreas.map((area, index) => {
							const key = areaKeys
								.map((field) => area[field])
								.filter(Boolean)
								.concat(index)
								.join('-');

							return (
								<Cell key={key} col={userAreas.length}>
									<UserSpecialities
										form={form}
										selected={area}
										index={index}
										onFinishInitialLoading={() => {
											const newValue = [...hasAreasLoading];
											newValue[index] = false;
											setHasAreasLoading(newValue);
										}}
									/>
								</Cell>
							);
						})}

						{userAreas.length < maxAreaNumber && (
							<S.Button
								type="button"
								variant="contained"
								wrapperCss={S.buttonAddAreasWrapperCss}
								alignSelf="flex-start"
								onClick={() => {
									const newUserAreaValues = [...userAreas, emptyArea];
									setUserAreas(newUserAreaValues);
									setValue('areas', newUserAreaValues);
								}}
							>
								+
							</S.Button>
						)}
					</Loading>
				)}
			</Row>

			<Row>
				<Cell align="center">
					<p>{message}</p>
				</Cell>
			</Row>

			<Actions center>
				<S.Button type="submit" disabled={loading}>
					{loading ? t('account:labels.updatingUser') : t('account:labels.updateUser')}
				</S.Button>
			</Actions>
		</>
	);
};

CommonDataForm.propTypes = {
	form: PropTypes.shape({
		setValue: PropTypes.func,
		register: PropTypes.func,
		getValues: PropTypes.func,
	}),
	user: PropTypes.shape({
		full_name: PropTypes.string,
		company: PropTypes.string,
		email: PropTypes.string,
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
		institution_id: PropTypes.number,
		researcher: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
		areas: PropTypes.arrayOf(PropTypes.shape({})),
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
					<h3>Credenciais</h3>
					<S.FormContainer>
						<div>
							<Cell>
								<InputField
									form={form}
									label={t('account:labels.currentPassword')}
									name="currentPassword"
									placeholder="*****"
									type="password"
									validation={{ required: true }}
									variant="gray"
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
									variant="gray"
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
									variant="gray"
								/>
							</Cell>
						</div>
						<Row>
							<Cell align="center">
								<p>{message}</p>
							</Cell>
						</Row>
						<Actions center>
							<S.Button type="submit" color="primary" disabled={loading}>
								{loading
									? t('account:labels.updatingPassword')
									: t('account:labels.updatePassword')}
							</S.Button>
						</Actions>
					</S.FormContainer>
				</Cell>
			</Row>
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

export default MyProfile;
