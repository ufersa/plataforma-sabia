import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../Form';
import { RectangularButton } from '../../Button';

const getForm = (steps, currentStep) => {
	const findStep = steps.find((step) => step.slug === currentStep);
	return currentStep !== '' && findStep ? findStep.form : steps[0].form;
};

const FormWizard = ({ steps, currentStep, onSubmit, onFocus, isSubmitting, defaultValues }) => {
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
	const lastStep = currentStepIndex === steps.length - 1;

	/**
	 * Handles submitting the form data for each step of the form wizard.
	 *
	 * @param {object} formData An object containing all the form data.
	 * @param {object} form A instance of the `useForm` hook.
	 */
	const handleSubmit = (formData, form) => {
		onSubmit({ data: formData, nextStep }, form);
	};

	return (
		<Form onSubmit={handleSubmit} defaultValues={defaultValues} onFocus={onFocus}>
			{CurrentFormStep && <CurrentFormStep />}

			{nextStep && (
				<RectangularButton
					disabled={isSubmitting}
					type="submit"
					colorVariant="green"
					variant="outlined"
					fullWidth
				>
					{isSubmitting ? 'Salvando...' : 'Continuar'}
				</RectangularButton>
			)}
			{lastStep && (
				<RectangularButton
					disabled={isSubmitting}
					type="submit"
					colorVariant="green"
					variant="filled"
					boxShadow
					fullWidth
				>
					Cadastrar Edital
				</RectangularButton>
			)}
		</Form>
	);
};

FormWizard.propTypes = {
	onSubmit: PropTypes.func,
	isSubmitting: PropTypes.bool,
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			slug: PropTypes.string.isRequired,
			form: PropTypes.elementType,
		}),
	).isRequired,
	currentStep: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
	defaultValues: PropTypes.shape({}),
	onFocus: PropTypes.func.isRequired,
};

FormWizard.defaultProps = {
	isSubmitting: false,
	onSubmit: () => {},
	defaultValues: {},
};

export default FormWizard;
