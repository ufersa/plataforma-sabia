import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { AiTwotoneFlag } from 'react-icons/ai';
import { ContentContainer, Title } from '../components/Common';
import FormWizard from '../components/Form/FormWizard';
import { AboutTechnology } from '../components/TechnologyForm';
import Detais from '../components/TechnologyForm/Details';

export default {
	title: 'New Technology Form',
};

const steps = [
	{ slug: 'about', label: 'Sobre a Tecnologia' },
	{ slug: 'features', label: 'Caracterização' },
	{ slug: 'costs', label: 'Custos e Financiamentos' },
	{ slug: 'map', label: 'Mapas e Anexos' },
	{ slug: 'authors', label: 'Responsáveis' },
	{ slug: 'review', label: 'Revisão', icon: AiTwotoneFlag },
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

const newTechonologySteps = [
	{ slug: 'about', label: 'Sobre a Tecnologia', form: AboutTechnology },
	{ slug: 'features', label: 'Caracterização', form: Detais },
	{ slug: 'costs', label: 'Custos e Financiamentos' },
	{ slug: 'map', label: 'Mapas e Anexos' },
	{ slug: 'authors', label: 'Responsáveis' },
	{ slug: 'review', label: 'Revisão', icon: AiTwotoneFlag },
];

export const NewTechnology = () => {
	const [currentStep, setCurrentStep] = useState(newTechonologySteps[0].slug);

	const handleSubmit = (data) => {
		action('submit')(data);
		setCurrentStep(data.nextStep);
	};

	return (
		<ContentContainer>
			<Title align="left" noPadding noMargin>
				Cadastrar <span>Tecnologia</span>
			</Title>

			<FormWizard
				onSubmit={handleSubmit}
				onPrev={({ prevStep }) => setCurrentStep(prevStep)}
				currentStep={currentStep}
				steps={newTechonologySteps}
			/>
		</ContentContainer>
	);
};
