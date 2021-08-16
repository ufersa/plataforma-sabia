import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FiArrowRight } from 'react-icons/fi';
import useSWR from 'swr';
import useTranslation from 'next-translate/useTranslation';

import { RectangularButton } from '../../Button';
import { InputField, MaskedInputField, SelectField } from '../../Form';
import { getStateCities, getStates, updateUser } from '../../../services';
import { toast } from '../../Toast';
import { maskPatterns } from '../../../utils/masks';

import * as S from '../styles';
import { mapArrayOfObjectToSelect, setCookie } from '../../../utils/helper';

const mapValuesToApi = (values) => ({
	full_name: values.fullName,
	phone: values.phone,
	state_id: values.state.value,
	city_id: values.city.value,
});

const StepFour = ({ activeStep, setNextStep, userData }) => {
	const [isFetching, setIsFetching] = useState(false);
	const form = useForm({
		defaultValues: {
			fullName: '',
			phone: '',
			state: '',
			city: '',
		},
	});
	const { t } = useTranslation(['account']);
	const stateRef = useRef(null);
	stateRef.current = form.watch('state');

	const { data: brazilStates = [] } = useSWR('get-brazil-states', () => getStates(), {
		revalidateOnFocus: false,
	});

	const { data: brazilStateCities = [] } = useSWR(
		stateRef.current
			? `get-brazil-state-city-${stateRef.current.value || stateRef.current}`
			: null,
		() => getStateCities(stateRef.current.value || stateRef.current, { perPage: 10 }),
		{
			revalidateOnFocus: false,
		},
	);

	const handleSubmit = async (values) => {
		setIsFetching(true);
		setCookie('token', userData.token);
		const data = mapValuesToApi(values);
		const response = await updateUser(userData.id, data);

		if (!response || response.error) {
			const errorMessage =
				typeof response.error.message === 'string'
					? response.error.message
					: response.error.message?.[0]?.message;

			toast.error(
				errorMessage ||
					'Ocorreu um erro ao atualizar suas informações. Tente novamente em instantes...',
			);
			return;
		}

		setNextStep();
	};

	return (
		<S.Form onSubmit={form.handleSubmit(handleSubmit)}>
			<S.StepTitle>{activeStep.title}</S.StepTitle>
			<S.StepSubtitle>{activeStep.subtitle}</S.StepSubtitle>

			<S.InputsWrapper>
				<InputField
					name="fullName"
					form={form}
					label="Nome"
					placeholder="Digite seu nome completo"
					variant="lightRounded"
					validation={{ required: true }}
				/>

				<MaskedInputField
					form={form}
					name="phone"
					alwaysShowMask={false}
					label="Telefone"
					placeholder="Digite seu telefone"
					validation={{ required: true }}
					mask={maskPatterns.phoneNumber.stringMask}
					pattern={maskPatterns.phoneNumber.pattern}
					formatChars={maskPatterns.phoneNumber.formatChars}
					variant="lightRounded"
				/>

				<SelectField
					form={form}
					name="state"
					label={t('account:labels.state')}
					validation={{ required: true }}
					variant="lightRounded"
					options={mapArrayOfObjectToSelect(brazilStates, 'initials', 'id')}
					instanceId="select-state-register"
					placeholder="Selecione o estado..."
					callback={() => {
						form.setValue('city_id', null);
					}}
				/>

				<SelectField
					form={form}
					name="city"
					label={t('account:labels.city')}
					placeholder={
						!stateRef.current
							? 'Selecione o estado primeiro...'
							: 'Selecione a cidade...'
					}
					variant="lightRounded"
					options={mapArrayOfObjectToSelect(brazilStateCities, 'name', 'id')}
					noOptionsMessage={() => 'Nenhuma cidade encontrada...'}
					instanceId="select-city-register"
					validation={{ required: true }}
				/>
			</S.InputsWrapper>

			<S.FloatingAction>
				<RectangularButton
					variant="round"
					colorVariant="green"
					type="submit"
					disabled={isFetching}
				>
					Finalizar
					<FiArrowRight fontSize="2rem" />
				</RectangularButton>
			</S.FloatingAction>
		</S.Form>
	);
};

StepFour.propTypes = {
	activeStep: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
	}).isRequired,
	setNextStep: PropTypes.func.isRequired,
	userData: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		token: PropTypes.string.isRequired,
	}).isRequired,
};

export default StepFour;
