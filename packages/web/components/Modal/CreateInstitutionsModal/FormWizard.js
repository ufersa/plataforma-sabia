import React from 'react';
import PropTypes from 'prop-types';
import { Form, Actions } from '../../Form';
import { Button } from './styles';

const getForm = (steps, currentStep) => {
	const findStep = steps.find((step) => step.slug === currentStep);
	return currentStep !== '' && findStep ? findStep.form : steps[0].form;
};

const FormWizard = ({ steps, currentStep, onSubmit, onPrev, data, submitting, closeModal }) => {
	const CurrentFormStep = getForm(steps, currentStep);
	const currentStepSlug = currentStep || steps[0].slug;

	let currentStepIndex = 0;
	steps.forEach((step, i) => {
		if (step.slug === currentStepSlug) {
			currentStepIndex = i;
		}
	});

	const nextStep =
		currentStepIndex === steps.length - 1 ? false : steps[currentStepIndex + 1].slug;
	const prevStep = currentStepIndex === 0 ? false : steps[currentStepIndex - 1].slug;
	const lastStep = currentStepIndex === steps.length - 1;

	/**
	 * Handles going back in the form wizard.
	 */
	const handlePrev = () => {
		onPrev({ step: currentStepSlug, prevStep });
	};

	/**
	 * Handles submitting the form data for each step of the form wizard.
	 *
	 * @param {object} formData An object containing all the form data.
	 * @param {object} form A instance of the `useForm` hook.
	 */
	const handleSubmit = (formData, form) => {
		console.log('FORM WIZARD SUBMITTED', formData, form);

		onSubmit({ data: formData, step: currentStepSlug, nextStep }, form);
	};

	return (
		<Form onSubmit={handleSubmit}>
			{CurrentFormStep && <CurrentFormStep data={data} />}

			<Actions center>
				{prevStep ? (
					<Button
						type="button"
						variant="outlined"
						disabed={submitting}
						onClick={handlePrev}
					>
						Voltar
					</Button>
				) : (
					<Button
						type="button"
						variant="outlined"
						onClick={() => closeModal()}
						disabled={submitting}
					>
						Cancelar
					</Button>
				)}
				{nextStep && (
					<Button disabled={submitting} type="submit">
						{submitting ? 'Salvando...' : 'Continuar'}
					</Button>
				)}
				{lastStep && (
					<Button disabled={submitting} type="submit">
						Concluir
					</Button>
				)}
			</Actions>
		</Form>
	);
};

FormWizard.propTypes = {
	onSubmit: PropTypes.func,
	onPrev: PropTypes.func,
	submitting: PropTypes.bool,
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			slug: PropTypes.string.isRequired,
			form: PropTypes.elementType,
		}),
	).isRequired,
	currentStep: PropTypes.string.isRequired,
	data: PropTypes.shape({}),
	closeModal: PropTypes.func.isRequired,
};

FormWizard.defaultProps = {
	submitting: false,
	data: {},
	onSubmit: () => {},
	onPrev: () => {},
};

export default FormWizard;
