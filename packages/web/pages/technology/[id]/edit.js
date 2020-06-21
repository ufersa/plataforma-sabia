import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiTwotoneFlag } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { ContentContainer, Title } from '../../../components/Common';
import { useTheme } from '../../../hooks';
import { Protected } from '../../../components/Authorization';
import { AboutTechnology, Details, Review, Responsible } from '../../../components/TechnologyForm';
import FormWizard from '../../../components/Form/FormWizard';
import { getTaxonomies } from '../../../services';
import { createTechnology, getTechnology, updateTechnology } from '../../../services/technology';
import Responsible from '../../../components/TechnologyForm/Responsible';

const techonologyFormSteps = [
	{ slug: 'about', label: 'Sobre a Tecnologia', form: AboutTechnology },
	{ slug: 'features', label: 'Caracterização', form: Details },
	{ slug: 'responsible', label: 'Responsáveis', form: Responsible },
	{ slug: 'review', label: 'Revisão', form: Review, icon: AiTwotoneFlag },
];

const TechnologyFormPage = ({ initialValues, initialStep }) => {
	const { colors } = useTheme();
	const router = useRouter();
	const [formState, setFormState] = useState(initialValues.technology);
	const [currentStep, setCurrentStep] = useState(initialStep || techonologyFormSteps[0].slug);

	const handleSubmit = async ({ data, step, nextStep }) => {
		let result = false;

		if (
			step === techonologyFormSteps[0].slug &&
			typeof initialValues.technology?.id === 'undefined'
		) {
			const technology = await createTechnology(data);
			if (technology && technology.id) {
				router.push(`/technology/${technology.id}/edit?step=features`);
				return;
			}
		} else {
			result = await updateTechnology(initialValues.technology?.id, data);
			setFormState(result);
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
					initialValues={{ taxonomies: initialValues.taxonomies, technology: formState }}
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
	initialStep: PropTypes.string,
};

TechnologyFormPage.defaultProps = {
	initialStep: '',
};

TechnologyFormPage.getInitialProps = async (ctx) => {
	const { query, res } = ctx;

	const taxonomies = await getTaxonomies({ embed: true, parent: false, normalize: true });

	let technology = {};

	if (query && query.id) {
		technology = await getTechnology(query.id);

		// redirect if that technology does not exist or does not belong to this user.
		if (!technology && res) {
			res.writeHead(302, {
				Location: '/technology/new',
			}).end();
		}
	}

	return {
		initialStep: query?.step || '',
		initialValues: { taxonomies, technology },
		namespacesRequired: ['common', 'error'],
	};
};

export default TechnologyFormPage;
