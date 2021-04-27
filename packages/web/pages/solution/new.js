import React from 'react';
import Link from 'next/link';
import styled, { css, useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { RectangularButton } from '../../components/Button';
import { Title } from '../../components/Common';
import Head from '../../components/head';
import { internal as internalPages } from '../../utils/consts/pages';

const NewSolutionPage = () => {
	const { colors } = useTheme();
	const { t } = useTranslation(['pages']);

	return (
		<>
			<Head
				title={t('pages:solution.new.title')}
				description={t('pages:solution.new.description')}
				keywords={t('pages:solution.new.keywords')}
			/>
			<Wrapper>
				<Container>
					<Title color={colors.black}>Que tipo de solução você irá cadastrar?</Title>

					<RegisterType>
						<Link href={internalPages.newTechnology} passHref>
							<RectangularButton
								as="a"
								variant="backgroundImage"
								backgroundUrl="/buttons/agro-machine.png"
								colorVariant="orange"
								fullWidth
							>
								Tecnologias
							</RectangularButton>
						</Link>
						<Link href={internalPages.newService} passHref>
							<RectangularButton
								as="a"
								variant="backgroundImage"
								backgroundUrl="/buttons/hand-holding-earth.png"
								colorVariant="green"
								fullWidth
							>
								Serviços
							</RectangularButton>
						</Link>
					</RegisterType>
				</Container>
			</Wrapper>
		</>
	);
};

NewSolutionPage.getInitialProps = async () => {
	return {
		namespacesRequired: ['pages'],
	};
};

const Wrapper = styled.section`
	${({ theme: { colors } }) => css`
		background-color: ${colors.lightGray4};
		padding: 4.8rem 5%;
	`}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const RegisterType = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, min(27rem, 100%));
	grid-gap: 1.6rem;
	justify-content: center;
	width: 100%;
	margin-top: 1.6rem;

	a {
		height: 27rem;
		font-size: 2.4rem;
		line-height: 3rem;
		font-weight: 500;
		text-transform: none;
	}
`;

export default NewSolutionPage;
