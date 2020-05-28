import React, { useState } from 'react';
import { AiTwotoneFlag } from 'react-icons/ai';
import { ContentContainer, Title } from '../../components/Common';

import { AboutTechnology } from '../../components/NewTechnologyForm';
import Detais from '../../components/NewTechnologyForm/Details';
import FormWizard from '../../components/Form/FormWizard';
import { useAuth } from '../../hooks';

const newTechonologySteps = [
	{ slug: 'about', label: 'Sobre a Tecnologia', form: AboutTechnology },
	{ slug: 'features', label: 'Caracterização', form: Detais },
	{ slug: 'costs', label: 'Custos e Financiamentos', form: null },
	{ slug: 'map', label: 'Mapas e Anexos', form: null },
	{ slug: 'authors', label: 'Responsáveis', form: null },
	{ slug: 'review', label: 'Revisão', form: null, icon: AiTwotoneFlag },
];

const NewTechnology = () => {
	const [currentStep, setCurrentStep] = useState(newTechonologySteps[0].slug);

	const handleSubmit = (data) => {
		setCurrentStep(data.nextStep);
	};

	const { user } = useAuth();
	if (!user.email) {
		return <ContentContainer />;
	}

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

NewTechnology.getInitialProps = async () => {
	return {
		namespacesRequired: ['common'],
	};
};

export default NewTechnology;
