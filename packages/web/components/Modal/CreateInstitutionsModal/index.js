import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from '../../Toast';
import { Container } from './styles';
import { createInstitutions } from '../../../services';
import { unMask } from '../../../utils/helper';
import FormWizard from './FormWizard';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const institutionsFormSteps = [
	{
		slug: 'one',
		form: StepOne,
	},
	{
		slug: 'two',
		form: StepTwo,
	},
	{
		slug: 'three',
		form: StepThree,
	},
];

const CreateInstitutionsModal = ({ closeModal, onClose }) => {
	const [currentStep, setCurrentStep] = useState(institutionsFormSteps[0].slug);
	const [submitting, setSubmitting] = useState(false);
	const [formData, setFormData] = useState({});

	/**
	 * Handles submitting the technology form.
	 *
	 * @param {object} params The form params object.
	 * @param {object} params.data The form data object.
	 * @param {string} params.nextStep The next step of the form.
	 */
	const handleSubmit = async ({ data, nextStep }) => {
		setSubmitting(true);

		if (!nextStep) {
			const response = await createInstitutions({
				...formData,
				...data,
				zipcode: unMask(formData?.zipcode),
				state: formData?.state?.value,
				category: formData?.category?.value,
				type: formData?.type?.value,
			});

			if (response.status === 201) {
				setFormData({});
				closeModal();
				onClose();
				toast.success('Instituição cadastrada com sucesso');
			} else {
				setFormData({});
				closeModal();
				onClose();

				if (response?.data?.error?.error_code === 'VALIDATION_ERROR') {
					toast.error(response.data.error.message[0].message);
				} else {
					toast.error('Não foi possível cadastrar a instituição');
				}
			}
		}

		setFormData({ ...formData, ...data });
		setCurrentStep(nextStep);
		setSubmitting(false);
	};

	/**
	 * Handles going back in the form wizard.
	 *
	 * @param {object} params The previous form handler params object.
	 * @param {string} params.nextStep The next step of the form.
	 */
	const handlePrev = ({ prevStep }) => {
		setCurrentStep(prevStep);
	};

	return (
		<Container>
			<h3>Cadastrar nova Organização</h3>
			<FormWizard
				key={currentStep}
				onSubmit={handleSubmit}
				onPrev={handlePrev}
				currentStep={currentStep}
				submitting={submitting}
				steps={institutionsFormSteps}
				closeModal={closeModal}
				defaultValues={formData}
			/>
		</Container>
	);
};

CreateInstitutionsModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	onClose: PropTypes.func,
};

CreateInstitutionsModal.defaultProps = {
	onClose: () => {},
};

export default CreateInstitutionsModal;
