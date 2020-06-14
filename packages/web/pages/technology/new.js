import React, { useState } from 'react';
import { AiTwotoneFlag } from 'react-icons/ai';
import { ContentContainer, Title } from '../../components/Common';
import { useTheme, useAuth } from '../../hooks';

import { AboutTechnology } from '../../components/NewTechnologyForm';
import Responsible from '../../components/NewTechnologyForm/Responsible';
import Details from '../../components/NewTechnologyForm/Details';
import FormWizard from '../../components/Form/FormWizard';

const newTechonologySteps = [
	{ slug: 'about', label: 'Sobre a Tecnologia', form: AboutTechnology },
	{ slug: 'features', label: 'Caracterização', form: Details },
	{ slug: 'responsible', label: 'Responsáveis', form: Responsible },
	{ slug: 'review', label: 'Revisão', form: null, icon: AiTwotoneFlag },
];

const NewTechnology = () => {
	const { colors } = useTheme();
	const [currentStep, setCurrentStep] = useState(newTechonologySteps[0].slug);

	const handleSubmit = (data) => {
		setCurrentStep(data.nextStep);
	};

	const { user } = useAuth();
	if (!user.email) {
		return <ContentContainer />;
	}

	return (
		<ContentContainer bgColor={colors.gray98}>
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
