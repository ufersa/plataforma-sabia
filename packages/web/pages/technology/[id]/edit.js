import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiTwotoneFlag } from 'react-icons/ai';
import { ContentContainer, Title } from '../../../components/Common';
import { useTheme } from '../../../hooks';
import { Protected } from '../../../components/Authorization';
import { AboutTechnology } from '../../../components/TechnologyForm';
import Details from '../../../components/TechnologyForm/Details';
import FormWizard from '../../../components/Form/FormWizard';
import { getTaxonomies } from '../../../services';

const techonologyFormSteps = [
	{ slug: 'about', label: 'Sobre a Tecnologia', form: AboutTechnology },
	{ slug: 'features', label: 'Caracterização', form: Details },
	{ slug: 'review', label: 'Revisão', form: null, icon: AiTwotoneFlag },
];

const TechnologyFormPage = ({ taxonomies }) => {
	const { colors } = useTheme();
	const [currentStep, setCurrentStep] = useState(techonologyFormSteps[0].slug);

	const handleSubmit = (data) => {
		setCurrentStep(data.nextStep);
	};

	const initialValues = {
		taxonomies,
	};

	return (
		<ContentContainer bgColor={colors.gray98}>
			<Protected>
				<Title align="left" noPadding noMargin>
					Cadastrar <span>Tecnologia</span>
				</Title>

				<FormWizard
					onSubmit={handleSubmit}
					onPrev={({ prevStep }) => setCurrentStep(prevStep)}
					currentStep={currentStep}
					steps={techonologyFormSteps}
					initialValues={initialValues}
				/>
			</Protected>
		</ContentContainer>
	);
};

TechnologyFormPage.propTypes = {
	taxonomies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

TechnologyFormPage.getInitialProps = async () => {
	const taxonomies = await getTaxonomies({ embed: true, parent: false, normalize: true });

	return {
		taxonomies,
		namespacesRequired: ['common', 'error'],
	};
};

export default TechnologyFormPage;
