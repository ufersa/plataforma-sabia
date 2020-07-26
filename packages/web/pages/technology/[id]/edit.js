import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiTwotoneFlag } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { ContentContainer, Title } from '../../../components/Common';
import { useTheme } from '../../../hooks';
import { Protected } from '../../../components/Authorization';
import {
	AboutTechnology,
	Details,
	Review,
	Responsible,
	Costs,
} from '../../../components/TechnologyForm';
import FormWizard from '../../../components/Form/FormWizard';
import { getTaxonomies } from '../../../services';
import {
	createTechnology,
	getTechnology,
	updateTechnology,
	getTechnologyCosts,
	updateTechnologyCosts,
} from '../../../services/technology';

const techonologyFormSteps = [
	{ slug: 'about', label: 'Sobre a Tecnologia', form: AboutTechnology },
	{ slug: 'features', label: 'Caracterização', form: Details },
	{ slug: 'costs', label: 'Custos e Financiamento', form: Costs },
	{ slug: 'responsible', label: 'Responsáveis', form: Responsible },
	{ slug: 'review', label: 'Revisão', form: Review, icon: AiTwotoneFlag },
];

const TechnologyFormPage = ({ initialValues, initialStep }) => {
	const { colors } = useTheme();
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState(initialStep || techonologyFormSteps[0].slug);

	const handleSubmit = async ({ data, step, nextStep }, form) => {
		const { reset, getValues } = form;
		let result = false;

		const technologyId = initialValues.technology?.id;
		if (step === techonologyFormSteps[0].slug && typeof technologyId === 'undefined') {
			const technology = await createTechnology(data);
			if (technology && technology.id) {
				router.push(`/technology/${technology.id}/edit?step=features`);
				return;
			}
		} else {
			result = await updateTechnology(technologyId, data, { normalize: true });

			if (data.costs) {
				result.costs = await updateTechnologyCosts(technologyId, data.costs);
			} else {
				result.costs = getValues('costs');
			}
		}

		if (result) {
			reset(result);
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
					data={{
						taxonomies: initialValues.taxonomies,
					}}
					defaultValues={{
						costs: initialValues.technologyCosts,
						...initialValues.technology,
					}}
				/>
			</Protected>
		</ContentContainer>
	);
};

TechnologyFormPage.propTypes = {
	initialValues: PropTypes.shape({
		taxonomies: PropTypes.shape({}),
		technology: PropTypes.shape({}),
		technologyCosts: PropTypes.shape({}),
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
	let technologyCosts = {};

	if (query && query.id) {
		technology = await getTechnology(query.id, {
			normalize: true,
			embed: true,
		});

		// redirect if that technology does not exist or does not belong to this user.
		if (!technology && res) {
			res.writeHead(302, {
				Location: '/technology/new',
			}).end();
		}

		technologyCosts = await getTechnologyCosts(query.id, {
			normalize: true,
		});
	}

	return {
		initialStep: query?.step || '',
		initialValues: { taxonomies, technology, technologyCosts },
		namespacesRequired: ['common', 'error'],
	};
};

export default TechnologyFormPage;
