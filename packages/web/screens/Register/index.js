import React, { useState } from 'react';
import Image from 'next/image';
import { FiArrowRight, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

import * as S from './styles';
import steps from './steps';
import { RectangularButton } from '../../components/Button/styles';

const Register = () => {
	const [activeStep, setActiveStep] = useState({ ...steps[0], index: 0 });
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

					<S.LogoWrapper>
						<Image
							src="/logo-mono.svg"
							alt="Plataforma Sabiá"
							width={215}
							height={65}
							layout="responsive"
						/>
					</S.LogoWrapper>

					<S.StepsWrapper>
						<S.StepsTitle>Cadastro de Usuários</S.StepsTitle>

						<S.Steps>
							{steps.map((step, index) => {
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

export default Register;