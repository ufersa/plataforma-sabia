import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { Form, Actions } from './Form';
import { Button } from '../Button';

const FormWizardContainer = styled.div``;
const Steps = styled.ol`
	width: 100%;
	background: ${({ theme }) => theme.colors.yellow};
	border-top: 4px solid ${({ theme }) => theme.colors.lightGray};
	padding: 3rem 0 5rem 0;
	list-style: none;
	display: flex;
	justify-content: center;
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
`;

const StepLabel = styled.p`
	font-size: 1.4rem;
	color: ${({ theme }) => theme.colors.white};
	font-weight: 700;
	position: absolute;
	bottom: -25px;
`;

const StepNumber = styled.span`
	background: ${({ theme }) => theme.colors.white};
	display: block;
	text-align: center;
	font-size: 4.5rem;
	height: 6rem;
	width: 6rem;
	line-height: 6rem;
	border-radius: 50%;
	position: relative;

	> svg {
		height: 100%;
	}
`;

const FormWizard = ({ steps, currentStep, onSubmit }) => {
	const CurrentFormStep =
		currentStep !== '' ? steps.find((step) => step.slug === currentStep).form : steps[0].form;

	const currentStepSlug = currentStep || steps[0].slug;
	let currentStepIndex = 0;
	steps.forEach((step, i) => {
		if (step.slug === currentStepSlug) {
			currentStepIndex = i;
		}
	});

	const handleSubmit = (data) => {
		const nextStep =
			currentStepIndex === steps.length - 1 ? '' : steps[currentStepIndex + 1].slug;
		onSubmit({ data, step: currentStepSlug, nextStep });
	};
	return (
		<FormWizardContainer>
			<Steps>
				{steps.map((step, i) => {
					const showIcon = i < currentStepIndex || typeof step.icon !== 'undefined';
					const Icon = i < currentStepIndex ? AiOutlineCheck : step.icon || null;
					return (
						<StepItem completed={i <= currentStepIndex} key={step.slug}>
							<div>
								<StepNumber>{showIcon ? <Icon /> : i + 1}</StepNumber>
								<StepLabel>{step.label}</StepLabel>
							</div>
						</StepItem>
					);
				})}
			</Steps>

			<Form onSubmit={handleSubmit}>
				{CurrentFormStep && <CurrentFormStep />}
				<Actions>
					<Button type="submit">Salvar e Continuar</Button>
				</Actions>
			</Form>
		</FormWizardContainer>
	);
};

FormWizard.propTypes = {
	onSubmit: PropTypes.func,
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			slug: PropTypes.string.isRequired,
			form: PropTypes.elementType,
			icon: PropTypes.elementType,
		}),
	).isRequired,
	currentStep: PropTypes.string,
};

FormWizard.defaultProps = {
	onSubmit: () => {},
	currentStep: '',
};

export default FormWizard;
