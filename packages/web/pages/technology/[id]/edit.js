import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiTwotoneFlag } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { ContentContainer, Title } from '../../../components/Common';
import { useTheme } from '../../../hooks';
import { Protected } from '../../../components/Authorization';
import { AboutTechnology } from '../../../components/TechnologyForm';
import Details from '../../../components/TechnologyForm/Details';
import FormWizard from '../../../components/Form/FormWizard';
import { getTaxonomies } from '../../../services';
import { createTechnology, getTechnology } from '../../../services/technology';

const techonologyFormSteps = [
	{ slug: 'about', label: 'Sobre a Tecnologia', form: AboutTechnology },
	{ slug: 'features', label: 'Caracterização', form: Details },
	{ slug: 'review', label: 'Revisão', form: null, icon: AiTwotoneFlag },
];

const TechnologyFormPage = ({ initialValues }) => {
	const { colors } = useTheme();
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState(techonologyFormSteps[0].slug);

	const handleSubmit = async ({ data, step, nextStep }) => {
		const result = false;

		if (step === techonologyFormSteps[0].slug) {
			const technology = await createTechnology(data);
			if (technology && technology.id) {
				router.push(`/technology/${technology.id}/edit`);
				return;
			}
		} else {
			// update technology
		}

		if (result) {
			setCurrentStep(nextStep);
		}
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
	initialValues: PropTypes.shape({
		taxonomies: PropTypes.shape({}),
		technology: PropTypes.shape({}),
	}).isRequired,
};

TechnologyFormPage.getInitialProps = async (ctx) => {
	const { query } = ctx;
	const { id } = query;
	const taxonomies = await getTaxonomies({ embed: true, parent: false, normalize: true });

	let technology = {};

	if (id) {
		technology = await getTechnology(id);
	}

	return {
		initialValues: { taxonomies, technology },
		namespacesRequired: ['common', 'error'],
	};
};

export default TechnologyFormPage;
