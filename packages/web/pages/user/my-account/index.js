import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { FiEdit3 } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import debounce from 'lodash.debounce';
import useSWR from 'swr';

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
import {
	updateUser,
	updateUserPassword,
	getInstitutions,
	getStates,
	getStateCities,
} from '../../../services';
import { maskPatterns, replaceWithMask } from '../../../utils/masks';

const mapInstitutionsOptions = (institutions) => {
	if (!institutions?.length) {
		return [];
	}

	return (
		institutions?.map((institution) => ({
			label: getInstitutionLabel(institution),
			value: institution?.id,
		})) || []
	);
};

/**
 * Transform user fields that needs mask.
 * This is necessary because we receive values without mask from api.
 *
 * @param {object} user The current user object
 * @returns {object} Transformed user object with masks
 */
const transformUserDefaultValues = (user) => ({
	...user,
	cpf: replaceWithMask(user.cpf, 'cpf'),
	birth_date: replaceWithMask(dateToString(user.birth_date), 'brazilianDate'),
	phone_number: replaceWithMask(user.phone_number, 'phoneNumber'),
	zipcode: replaceWithMask(user.zipcode, 'zipCode'),
});

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
			state_id: data.state_id?.value,
			city_id: data.city_id?.value,
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
						<Form
							defaultValues={{ ...transformUserDefaultValues(user) }}
							onSubmit={handleSubmit}
						>
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

const CommonDataForm = ({ form, user, message, loading }) => {
	const { setValue, register, watch } = form;
	const { t } = useTranslation(['account']);
	const { openModal } = useModal();
	const [isResearcher, setIsResearcher] = useState(Boolean(user.researcher));
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
	const brazilStateId = watch('state_id');

	const { data: { data: institutions } = {} } = useSWR(
		'get-institutions',
		() => getInstitutions({ perPage: 10, order: 'desc' }),
		{
			revalidateOnFocus: false,
		},
	);

	const { data: brazilStates = [] } = useSWR('get-brazil-states', () => getStates(), {
		revalidateOnFocus: false,
	});

	const { data: brazilStateCities = [] } = useSWR(
		brazilStateId ? `get-brazil-state-city-${brazilStateId.value || brazilStateId}` : null,
		() => getStateCities(brazilStateId.value || brazilStateId, { perPage: 10 }),
		{
			revalidateOnFocus: false,
		},
	);

	const handleFetchInstitutions = debounce((value, callback) => {
		getInstitutions({ filterBy: 'name', filter: value, order: 'desc' }).then((response) => {
			const mappedOptions = mapInstitutionsOptions(response.data);
			callback(mappedOptions);
		});
	}, 300);

	/**
	 * Returns default institutions for use in async select
	 * Do not concat user institution with institutions array if already exists
	 *
	 * @returns {Array} Institutions options
	 */
	const getDefaultInstitutionsOptions = () => {
		const userInstitution = institutions?.find(
			(institution) => institution.id === user.institution_id,
		);

		return [
			...mapInstitutionsOptions(institutions),
			...(!userInstitution ? mapInstitutionsOptions([user.institution]) : []),
		];
	};

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
							type="email"
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
						validation={{ required: true }}
						variant="gray"
						pattern={maskPatterns.cpf.pattern}
						mask={maskPatterns.cpf.stringMask}
					/>
				</Cell>
				<Cell col={4}>
					<MaskedInputField
						form={form}
						name="birth_date"
						label={t('account:labels.birthDate')}
						validation={{ required: true }}
						variant="gray"
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
						validation={{ required: true }}
						variant="gray"
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
						validation={{ required: true }}
						label={t('account:labels.zipCode')}
						variant="gray"
						mask={maskPatterns.zipCode.stringMask}
						pattern={maskPatterns.zipCode.pattern}
					/>
				</Cell>
				<Cell col={4}>
					<InputField
						form={form}
						name="address"
						validation={{ required: true }}
						label={t('account:labels.address')}
						variant="gray"
					/>
				</Cell>
				<Cell col={4}>
					<InputField
						form={form}
						name="address2"
						validation={{ required: true }}
						label={t('account:labels.address2')}
						variant="gray"
					/>
				</Cell>
			</Row>
			<Row>
				<Cell col={3}>
					<InputField
						form={form}
						name="district"
						validation={{ required: true }}
						label={t('account:labels.district')}
						variant="gray"
					/>
				</Cell>
				<Cell col={3}>
					<SelectField
						form={form}
						name="state_id"
						label={t('account:labels.state')}
						validation={{ required: true }}
						variant="gray"
						options={mapArrayOfObjectToSelect(brazilStates, 'initials', 'id')}
						instanceId="select-state-my-account"
						placeholder="Selecione o estado..."
						callback={() => {
							setValue('city_id', null);
						}}
					/>
				</Cell>
				<Cell col={3}>
					<SelectField
						form={form}
						name="city_id"
						label={t('account:labels.city')}
						placeholder={
							!brazilStateId
								? 'Selecione o estado primeiro...'
								: 'Selecione a cidade...'
						}
						variant="gray"
						options={mapArrayOfObjectToSelect(brazilStateCities, 'name', 'id')}
						noOptionsMessage={() => 'Nenhuma cidade encontrada...'}
						instanceId="select-city-my-account"
						validation={{ required: true }}
					/>
				</Cell>
				<Cell col={3}>
					<InputField
						form={form}
						name="country"
						validation={{ required: true }}
						label={t('account:labels.country')}
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
								form={form}
								name="institution_id"
								label={t('account:labels.institution')}
								placeholder="Pesquise sua instituição"
								variant="gray"
								isAsync
								cacheOptions
								defaultOptions={getDefaultInstitutionsOptions()}
								loadOptions={handleFetchInstitutions}
								loadingMessage={() => 'Carregando...'}
								noOptionsMessage={() => 'Nenhuma insitutição encontrada...'}
								instanceId="select-institutions-my-account"
							/>
						</Cell>
						<S.Button
							type="button"
							variant="outlined"
							wrapperCss={S.buttonInstitutionsWrapperCss}
							onClick={() =>
								openModal('createInstitutions', null, { overlayClick: false })
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
		watch: PropTypes.func,
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
		institution: PropTypes.shape({}),
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
									placeholder="********"
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
