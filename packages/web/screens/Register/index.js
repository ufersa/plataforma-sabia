import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

import * as S from './styles';
import { RectangularButton } from '../../components/Button/styles';
import { steps } from '../../components/Register';
import { internal as internalPages } from '../../utils/enums/pages.enum';

const Register = ({ initialStepIndex }) => {
	const [activeStep, setActiveStep] = useState({
		...steps[initialStepIndex ?? 0],
		index: initialStepIndex ?? 0,
	});
	const [userData, setUserData] = useState({});
	const CurrentStepComponent = activeStep.component;
	const isLastStep = activeStep.index === steps.length - 1;
	const canGoToPreviousStep = activeStep.index === 1;

	const updateUserData = (data) => setUserData((prev) => ({ ...prev, ...data }));

	const setNextStep = () => {
		setActiveStep((active) => ({ ...steps[active.index + 1], index: active.index + 1 }));
	};

	const setPrevStep = () => {
		setActiveStep((active) => ({ ...steps[active.index - 1], index: active.index - 1 }));
	};

	return (
		<S.Container backgroundImage={activeStep.backgroundImage}>
			{!isLastStep && (
				<S.Sidebar>
					{canGoToPreviousStep && (
						<RectangularButton colorVariant="silver" onClick={setPrevStep}>
							<FiArrowLeft fontSize="2rem" strokeWidth={2.5} />
						</RectangularButton>
					)}

					<Link href={internalPages.home} passHref>
						<S.LogoWrapper>
							<Image
								src="/logo-mono.svg"
								alt="Plataforma Sabiá"
								width={215}
								height={65}
								layout="responsive"
							/>
						</S.LogoWrapper>
					</Link>

					<S.StepsWrapper>
						<S.StepsTitle>Cadastro de Usuários</S.StepsTitle>

						<S.Steps>
							{steps.map((step, index) => {
								const isLast = index === steps.length - 1;
								if (isLast) return null;

								const isActive = step.title === activeStep.title;
								const isCompleted = activeStep.index > index;

								return (
									<S.Step
										key={step.title}
										active={isActive}
										completed={isCompleted}
									>
										{!!isActive && <FiArrowRight />}
										{!!isCompleted && <FiCheckCircle />}

										<p>{step.title}</p>
									</S.Step>
								);
							})}
						</S.Steps>
					</S.StepsWrapper>
				</S.Sidebar>
			)}

			<S.Content>
				{!isLastStep && (
					<>
						<S.PageTitle>Cadastro de Usuários</S.PageTitle>
						<S.ProgressIndicator
							stepsLength={steps.length}
							activeStepIndex={activeStep.index}
						/>
					</>
				)}

				{CurrentStepComponent && (
					<CurrentStepComponent
						activeStep={activeStep}
						setNextStep={setNextStep}
						setPrevStep={setPrevStep}
						userData={userData}
						updateUserData={updateUserData}
					/>
				)}
			</S.Content>
		</S.Container>
	);
};

Register.propTypes = {
	initialStepIndex: PropTypes.number.isRequired,
};

export default Register;
