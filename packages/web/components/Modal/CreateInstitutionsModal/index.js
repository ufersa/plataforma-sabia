import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { toast } from '../../Toast';
// import { Form } from '../../Form';
import { useForm } from 'react-hook-form';
import { Container } from './styles';
// import { createInstitutions } from '../../../services';
// import { unMask } from '../../../utils/helper';
import FormWizard from './FormWizard';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const institutionsFormSteps = [
	{
		slug: 'one',
		form: StepOne,
	},
	{
		slug: 'two',
		form: StepTwo,
	},
];

const CreateInstitutionsModal = ({ closeModal, onClose }) => {
	const [currentStep, setCurrentStep] = useState(institutionsFormSteps[0].slug);
	const [submitting, setSubmitting] = useState(false);

	/**
	 * Handles submitting the technology form.
	 *
	 * @param {object} params The form params object.
	 * @param {object} params.data The form data object.
	 * @param {string} params.step The current step of the form.
	 * @param {string} params.nextStep The next step of the form.
	 */
	const handleSubmit = async ({ data, step, nextStep }) => {
		setSubmitting(true);

		console.log('INDEX HANDLE SUBMIT', data, step, nextStep);

		setCurrentStep(nextStep);

		setSubmitting(false);
	};

	/**
	 * Handles going back in the form wizard.
	 */
	const handlePrev = ({ prevStep }) => {
		console.log('INDEX PREV', prevStep);
		setCurrentStep(prevStep);
	};

	// const [isSubmitting, setIsSubmitting] = useState(false);

	// const handleSubmit = async ({ cnpj, zipcode, state, ...data }) => {
	// 	setIsSubmitting(true);

	// 	const result = await createInstitutions({
	// 		...data,
	// 		zipcode: unMask(zipcode),
	// 		cnpj: unMask(cnpj),
	// 		state: state.value,
	// 	});

	// 	setIsSubmitting(false);

	// 	if (result?.error) {
	// 		if (result?.error?.error_code === 'VALIDATION_ERROR') {
	// 			toast.error(result.error.message[0].message);
	// 		} else {
	// 			toast.error('Não foi possível cadastrar a instituição');
	// 		}
	// 	} else {
	// 		closeModal();
	// 		onClose();
	// 		toast.success('Instituição cadastrada');
	// 	}
	// };

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
				data={{ testing: 'hello' }}
				closeModal={closeModal}
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
