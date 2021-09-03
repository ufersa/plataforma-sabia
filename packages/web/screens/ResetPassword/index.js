import Image from 'next/image';
import { useState } from 'react';

import { Link } from '../../components/Link';
import { steps } from '../../components/ResetPassword';
import { internal as internalPages } from '../../utils/enums/pages.enum';
import { Container, Aside, LogoWrapper, LogoImage, BackgroundImageWrapper } from '../SignIn/styles';

const ResetPassword = () => {
	const [activeStep, setActiveStep] = useState({
		...steps[0],
		index: 0,
	});
	const [userData, setUserData] = useState({});

	const CurrentStepComponent = activeStep.component;

	const updateUserData = (data) => setUserData((prev) => ({ ...prev, ...data }));

	const setNextStep = () => {
		setActiveStep((active) => ({ ...steps[active.index + 1], index: active.index + 1 }));
	};

	const setPrevStep = () => {
		setActiveStep((active) => ({ ...steps[active.index - 1], index: active.index - 1 }));
	};

	return (
		<Container>
			<Aside>
				<LogoWrapper>
					<Link href={internalPages.home} passHref>
						<LogoImage>
							<Image src="/logo-color.svg" layout="fill" objectFit="cover" priority />
						</LogoImage>
					</Link>
				</LogoWrapper>
				<BackgroundImageWrapper>
					<Image src="/wind-turbine.svg" layout="fill" objectFit="cover" priority />
				</BackgroundImageWrapper>
			</Aside>

			{CurrentStepComponent && (
				<CurrentStepComponent
					activeStep={activeStep}
					setNextStep={setNextStep}
					setPrevStep={setPrevStep}
					updateUserData={updateUserData}
					userData={userData}
				/>
			)}
		</Container>
	);
};

export default ResetPassword;
