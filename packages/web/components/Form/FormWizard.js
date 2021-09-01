import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { Form, Actions } from './Form';
import { Button } from '../Button';
import { stringToLocaleDate, formatCurrencyToInt } from '../../utils/helper';
import {
	Comment,
	CommentTitle,
	CommentContent,
	CommentText,
} from '../CurateTechnology/History/styles';
import {
	STATUS as statusEnum,
	LOCATIONS as technologyLocationsEnum,
} from '../../utils/enums/technology.enums';
import { SafeHtml } from '../SafeHtml';
import { internal as internalPages } from '../../utils/enums/pages.enum';

const FormWizardContainer = styled.div``;

const StepsContainer = styled.div`
	${({ theme: { colors, screens } }) => css`
		width: 100%;
		background: ${colors.primary};
		border-top: 4px solid ${colors.lightGray};
		padding: 3rem 0 6.5rem 0;

		@media (max-width: ${screens.large}px) {
			padding: 1rem 0 4rem 0;
		}
	`}
`;

const StepDescription = styled.div`
	${({ theme: { colors, screens } }) => css`
		width: 100%;
		background: ${colors.lightGray5};
		color: ${colors.lightGray};
		border-top: 4px solid ${colors.darkOrange};
		padding: 3rem 5rem;
		text-align: center;

		@media (max-width: ${screens.large}px) {
			padding: 1rem;
		}
	`}
`;

const MobileSteps = styled.ol`
	display: flex;
	flex-direction: column;
	align-items: center;

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;

		> li:nth-child(2) {
			font-size: 6rem;
		}

		> li:not(:last-child) {
			margin-right: 2rem;
		}
	}

	@media (min-width: ${({ theme }) => theme.screens.large}px) {
		display: none;
	}
`;

const WebSteps = styled.ol`
	display: flex;
	justify-content: center;
	align-items: center;
	list-style: none;

	@media (max-width: ${({ theme }) => theme.screens.large}px) {
		display: none;
	}
`;

const StepItem = styled.li`
	position: relative;
	display: flex;
	align-items: center;

	${({ completed }) =>
		completed &&
		css`
			> div {
				> p {
					color: ${({ theme }) => theme.colors.darkGray};
				}
				> span {
					color: ${({ theme }) => theme.colors.white};
					background: ${({ theme }) => theme.colors.darkGray};
				}
			}
		`};

	> div {
		display: flex;
		align-items: center;
		flex-direction: column;

		> p {
			height: 2rem;
		}
	}

	::after {
		content: '';
		display: block;
		position: relative;
		width: 100px;
		height: 12px;
		box-sizing: content-box;
		outline: 1px solid
			${({ theme, completed }) => (completed ? theme.colors.darkGray : theme.colors.white)};
		background: ${({ theme, completed }) =>
			completed ? theme.colors.darkGray : theme.colors.white};
	}

	:last-child ::after {
		display: none;
	}

	@media (max-width: ${({ theme }) => theme.screens.large}px) {
		::after {
			display: none;
		}
	}
`;

const StepLabel = styled.p`
	${({ theme: { colors, screens } }) => css`
		font-size: 1.39rem;
		color: ${colors.white};
		font-weight: 700;
		position: absolute;
		bottom: -25px;
		text-align: center;
		cursor: pointer;
		transition: color 0.4s ease-in-out;

		&:hover {
			color: ${colors.darkGray};
		}

		@media (max-width: ${screens.large}px) {
			position: relative;
			color: ${colors.darkGray};
		}
	`}
`;

const StepNumber = styled.span`
	background: ${({ theme }) => theme.colors.white};
	display: block;
	text-align: center;
	font-size: 4.5rem;
	height: 6rem;
	width: 6rem;
	cursor: pointer;
	line-height: 6rem;
	border-radius: 50%;
	position: relative;

	> svg {
		height: 100%;
	}
`;

const CurationComment = styled(Comment)`
	${({ theme: { colors, screens } }) => css`
		width: 50%;
		background-color: ${colors.secondary};
		margin-top: 1.2rem;
		margin-bottom: 2.8rem;

		${CommentTitle} {
			color: ${colors.white};
		}

		@media screen and (max-width: ${screens.medium}px) {
			width: 100%;
		}
	`}
`;

const getForm = (steps, currentStep) => {
	const findStep = steps.find((step) => step.slug === currentStep);
	return currentStep !== '' && findStep ? findStep.form : steps[0].form;
};

const parseCostValueToInt = (costs = []) => {
	if (!costs.length) {
		return [];
	}

	return costs.map((cost) => ({ ...cost, value: formatCurrencyToInt(cost.value) }));
};

const FormWizard = ({ steps, currentStep, onSubmit, onPrev, data, defaultValues, submitting }) => {
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
	const prevStep = currentStepIndex === 0 ? false : steps[currentStepIndex - 1].slug;
	const lastStep = currentStepIndex === steps.length - 1;

	/**
	 * Handles submitting the form data for each step of the form wizard.
	 *
	 * @param {object} formData An object containing all the form data.
	 * @param {object} form A instance of the `useForm` hook.
	 */
	const handleSubmit = (formData, form) => {
		const formattedData = { ...formData };
		if (currentStepSlug === 'costs') {
			const { funding_value, price } = formData.technologyCosts;

			formattedData.technologyCosts = {
				...formData.technologyCosts,
				costs: {
					development_costs: parseCostValueToInt(
						formData.technologyCosts?.costs?.development_costs,
					),
					implementation_costs: parseCostValueToInt(
						formData.technologyCosts?.costs?.implementation_costs,
					),
					maintenance_costs: parseCostValueToInt(
						formData.technologyCosts?.costs?.maintenance_costs,
					),
				},
				funding_value: funding_value ? formatCurrencyToInt(funding_value) : 0,
				price: price ? formatCurrencyToInt(price) : 0,
			};
		}

		if (currentStepSlug === 'about') {
			const filteredAreas = formattedData.knowledge_area_id.filter(Boolean);
			formattedData.knowledge_area_id = filteredAreas[filteredAreas.length - 1].value;
			formattedData.type = formattedData.type.value;
		}

		if (currentStepSlug === 'map-and-attachments') {
			const whoDevelop = formattedData.locations?.[technologyLocationsEnum.WHO_DEVELOP]?.map(
				(location) => ({
					location_id: location,
					location_type: technologyLocationsEnum.WHO_DEVELOP,
				}),
			);
			const whereIsImplemented = formattedData.locations?.[
				technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED
			]?.map((location) => ({
				location_id: location,
				location_type: technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED,
			}));

			formattedData.locations = [...(whoDevelop || []), ...(whereIsImplemented || [])];
		}

		if (Array.isArray(formattedData.knowledge_area_id)) {
			const filteredAreas = formattedData.knowledge_area_id.filter(Boolean);
			formattedData.knowledge_area_id =
				formattedData.knowledge_area_id[filteredAreas[filteredAreas.length - 1]];
		}

		onSubmit({ data: formattedData, step: currentStepSlug, nextStep }, form);
	};

	/**
	 * Handles going back in the form wizard.
	 */
	const handlePrev = () => {
		window.scrollTo({ top: 0 });
		onPrev({ step: currentStepSlug, prevStep });
	};

	const { technology: { revisions = [], status } = {} } = data;
	const lastCuratorRevision = revisions.length ? revisions[revisions.length - 1] : null;
	const renderStep = (step, index) => {
		const showIcon = index < currentStepIndex || typeof step.icon !== 'undefined';
		const Icon = index < currentStepIndex ? AiOutlineCheck : step.icon || null;
		const showLink = index < currentStepIndex;
		const isPublished = data.technology.status === statusEnum.PUBLISHED;
		if (isPublished || showLink) {
			return (
				<StepItem completed={index <= currentStepIndex} key={step.slug}>
					<Link
						href={`${internalPages.editTechnology.replace(
							':id',
							data?.technology?.id,
						)}/${step.slug}`}
					>
						<div>
							<StepNumber>{showIcon ? <Icon /> : index + 1}</StepNumber>
							<StepLabel>{step.label}</StepLabel>
						</div>
					</Link>
				</StepItem>
			);
		}

		return (
			<StepItem completed={index <= currentStepIndex} key={step.slug}>
				<div>
					<StepNumber>{showIcon ? <Icon /> : index + 1}</StepNumber>
					<StepLabel>{step.label}</StepLabel>
				</div>
			</StepItem>
		);
	};

	return (
		<FormWizardContainer>
			<StepsContainer>
				<WebSteps>{steps.map((step, index) => renderStep(step, index))}</WebSteps>
				<MobileSteps>
					<div>
						<StepItem completed>
							<div>
								<StepNumber>{currentStepIndex + 1}</StepNumber>
							</div>
						</StepItem>
						<li>/</li>
						<StepItem>
							<div>
								<StepNumber>{steps.length}</StepNumber>
							</div>
						</StepItem>
					</div>
					<StepLabel>{steps[currentStepIndex].label}</StepLabel>
				</MobileSteps>
			</StepsContainer>
			{steps[currentStepIndex].description && (
				<StepDescription>{steps[currentStepIndex].description}</StepDescription>
			)}

			<Form onSubmit={handleSubmit} defaultValues={defaultValues}>
				{CurrentFormStep && <CurrentFormStep data={data} />}

				{!!lastCuratorRevision && status === statusEnum.REQUESTED_CHANGES && (
					<CurationComment>
						<CommentTitle>
							<p>Comentários do curador</p>
						</CommentTitle>
						<CommentContent>
							<span>
								{stringToLocaleDate(lastCuratorRevision.created_at, {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</span>
							<CommentText>
								<SafeHtml html={lastCuratorRevision.description} />
							</CommentText>
						</CommentContent>
					</CurationComment>
				)}

				<Actions center>
					{prevStep && (
						<Button variant="secondary" disabed={submitting} onClick={handlePrev}>
							Voltar
						</Button>
					)}
					{nextStep && (
						<Button disabled={submitting} type="submit">
							{submitting ? 'Salvando...' : 'Salvar e Continuar'}
						</Button>
					)}
					{lastStep && (
						<Button variant="success" disabled={submitting} type="submit">
							Concluir
						</Button>
					)}
				</Actions>
			</Form>
		</FormWizardContainer>
	);
};

FormWizard.propTypes = {
	onSubmit: PropTypes.func,
	onPrev: PropTypes.func,
	submitting: PropTypes.bool,
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			description: PropTypes.string,
			slug: PropTypes.string.isRequired,
			form: PropTypes.elementType,
			icon: PropTypes.elementType,
		}),
	).isRequired,
	currentStep: PropTypes.string.isRequired,
	data: PropTypes.shape({
		technology: PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			status: PropTypes.string,
		}),
	}),
	defaultValues: PropTypes.shape({}),
};

FormWizard.defaultProps = {
	submitting: false,
	data: {},
	defaultValues: {},
	onSubmit: () => {},
	onPrev: () => {},
};

export default FormWizard;
