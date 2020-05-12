import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ContentContainer, Title } from '../components/Common';
import FormWizard from '../components/Form/FormWizard';

export default {
	title: 'New Technology Form',
};

const steps = [
	{ slug: 'about', label: 'Sobre a Tecnologia' },
	{ slug: 'features', label: 'Caracterização' },
	{ slug: 'costs', label: 'Custos e Financiamentos' },
	{ slug: 'map', label: 'Mapas e Anexos' },
	{ slug: 'authors', label: 'Responsáveis' },
	{ slug: 'review', label: 'Revisão' },
];

export const FormWizardSteps = () => {
	const [currentStep, setCurrentStep] = useState(steps[0].slug);

	const handleSubmit = ({ nextStep }) => {
		setCurrentStep(nextStep);
	};

	return (
		<ContentContainer>
			<FormWizard onSubmit={handleSubmit} currentStep={currentStep} steps={steps} />
		</ContentContainer>
	);
};

export const NewTechnology = () => {
	const [currentStep, setCurrentStep] = useState(steps[0].slug);

	const handleSubmit = (data) => {
		action('submit')(data);
		setCurrentStep(data.nextStep);
	};

	return (
		<ContentContainer>
			<Title align="left" noPadding noMargin>
				Cadastrar <span>Tecnologia</span>
			</Title>

			<FormWizard onSubmit={handleSubmit} currentStep={currentStep} steps={steps} />
		</ContentContainer>
	);
};
