import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { toast } from '../../Toast';
import { useAuth, useModal } from '../../../hooks';
import { formatCurrencyToInt, flattenSelectOptionsValue } from '../../../utils/helper';
import FormWizard from './FormWizard';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

import * as S from './styles';
import { createAnnouncement } from '../../../services/announcement';

const institutionsFormSteps = [
	{
		slug: 'one',
		form: StepOne,
	},
	{
		slug: 'two',
		// eslint-disable-next-line react/prop-types
		form: ({ form }) => (
			<>
				<StepOne form={form} />
				<StepTwo form={form} />
			</>
		),
	},
];

const RegisterAnnouncement = () => {
	const { t } = useTranslation(['common']);
	const { user } = useAuth();
	const { openModal } = useModal();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [currentStep, setCurrentStep] = useState(institutionsFormSteps[0].slug);
	const [formData, setFormData] = useState({});

	/**
	 * Handles submitting the announcement form.
	 *
	 * @param {object} params The form params object.
	 * @param {object} params.data The form data object.
	 * @param {string} params.nextStep The next step of the form.
	 */
	const handleSubmit = async ({ data, nextStep }) => {
		setIsSubmitting(true);

		if (!nextStep) {
			const { institution_id, keywords, targetAudiences, financial_resources } = data;
			const response = await createAnnouncement({
				...data,
				institution_id: institution_id.value,
				keywords: flattenSelectOptionsValue(keywords),
				targetAudiences: flattenSelectOptionsValue(targetAudiences),
				financial_resources: formatCurrencyToInt(financial_resources),
			});

			if (response.success) {
				setIsSubmitting(false);
				setCurrentStep(nextStep);
				return toast.success('Edital cadastrado com sucesso');
			}

			return toast.error(
				response.data?.message?.[0]?.message || 'Não foi possível cadastrar o edital',
			);
		}

		setFormData({ ...formData, ...data });
		setCurrentStep(nextStep);
		return setIsSubmitting(false);
	};

	/**
	 * Opens a modal to login or create a new user if there is no authenticated user
	 *
	 * @returns {void}
	 */
	const verifyAuthUser = () => {
		if (!user.email) {
			openModal('login', {
				message: t('common:signInToContinue'),
			});
		}
	};

	return (
		<S.Wrapper>
			<img
				src="accept-terms-rafiki.svg"
				alt="Ilustração de um rapaz de camiseta verde entregando uma lâmpada gigante à outro rapaz de blusa preta com uma forma laranja ao fundo."
			/>
			<S.Container>
				<S.Title align="left" noPadding noMargin>
					Cadastre um edital
				</S.Title>
				<FormWizard
					key={currentStep}
					onSubmit={handleSubmit}
					onFocus={verifyAuthUser}
					currentStep={currentStep}
					isSubmitting={isSubmitting}
					steps={institutionsFormSteps}
					defaultValues={formData}
				/>
			</S.Container>
		</S.Wrapper>
	);
};

export default RegisterAnnouncement;
