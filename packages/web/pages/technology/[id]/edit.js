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
	MapAndAttachments,
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
	{ slug: 'map-and-attachments', label: 'Mapas e Anexos', form: MapAndAttachments },
	{ slug: 'review', label: 'Revisão', form: Review, icon: AiTwotoneFlag },
];

const TechnologyFormPage = ({ taxonomies, technology, initialStep }) => {
	const { colors } = useTheme();
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState(initialStep || techonologyFormSteps[0].slug);
	const [submitting, setSubmitting] = useState(false);

	/**
	 * Handles submitting the technology form.
	 *
	 * @param {object} params The form params object.
	 * @param {object} params.data The form data object.
	 * @param {string} params.step The current step of the form.
	 * @param {string} params.nextStep The next step of the form.
	 * @param {object} form The react hook form object.
	 *
	 */
	const handleSubmit = async ({ data, step, nextStep }, form) => {
		setSubmitting(true);

		const { reset, getValues } = form;
		let result = false;

		const technologyId = technology?.id;
		if (step === techonologyFormSteps[0].slug && typeof technologyId === 'undefined') {
			const technologyData = await createTechnology(data);
			if (technologyData?.id) {
				router.push(`/technology/${technologyData.id}/edit?step=features`);
				return;
			}
		} else {
			result = await updateTechnology(technologyId, data, { normalize: true });

			if (data.technologyCosts) {
				result.technologyCosts = await updateTechnologyCosts(
					technologyId,
					data.technologyCosts,
					{ normalize: true },
				);
			} else {
				result.technologyCosts = getValues('technologyCosts');
			}
		}

		if (result) {
			reset(result);
			setCurrentStep(nextStep);
			window.scrollTo({ top: 0 });
		}

		setSubmitting(false);
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
					submitting={submitting}
					steps={techonologyFormSteps}
					data={{
						taxonomies,
					}}
					defaultValues={technology}
				/>
			</Protected>
		</ContentContainer>
	);
};

TechnologyFormPage.propTypes = {
	taxonomies: PropTypes.shape({}).isRequired,
	technology: PropTypes.shape({}).isRequired,
	initialStep: PropTypes.string,
};

TechnologyFormPage.defaultProps = {
	initialStep: '',
};

TechnologyFormPage.getInitialProps = async ({ query, res }) => {
	const taxonomies = await getTaxonomies({ embed: true, parent: false, normalize: true });

	let technology = {};

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

		technology.technologyCosts = await getTechnologyCosts(query.id, {
			normalize: true,
		});
	}

	return {
		initialStep: query?.step || '',
		taxonomies,
		technology,
		namespacesRequired: ['common', 'error'],
	};
};

export default TechnologyFormPage;
