import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Head from '../components/head';
import { RectangularButton } from '../components/Button';
import { Hero } from '../components/Hero';
import { SolutionsSection } from '../components/SolutionsSection';
import { useModal, useTheme } from '../hooks';
import { getServices, apiPost, apiPut, getTechnologies } from '../services';

const Home = ({ emailConfirmation, changeEmail, technologies, services }) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common', 'pages']);
	const { openModal } = useModal();

	useEffect(() => {
		if (emailConfirmation) {
			openModal('login', { message: t('common:verifiedEmail') });
		} else if (changeEmail) {
			openModal('login', { message: t('common:updatedEmail') });
		}
	}, [emailConfirmation, changeEmail, openModal, t]);

	return (
		<>
			<Head
				title={t('pages:home.title')}
				description={t('pages:home.description')}
				keywords={t('pages:home.keywords')}
			/>
			<Hero />
			<ButtonsWrapper>
				<ButtonsContainer>
					<Link href="/announcements" passHref>
						<RectangularButton
							as="a"
							variant="backgroundImage"
							backgroundUrl="/buttons/papers-background.png"
							colorVariant="green"
						>
							Banco de editais
						</RectangularButton>
					</Link>
					<Link href="/ideas" passHref>
						<RectangularButton
							as="a"
							variant="backgroundImage"
							backgroundUrl="/buttons/paper-light.png"
							colorVariant="orange"
						>
							Banco de ideias
						</RectangularButton>
					</Link>
					<Link href="/researchers" passHref>
						<RectangularButton
							// as="a"
							variant="backgroundImage"
							backgroundUrl="/buttons/notebook-writing.png"
							colorVariant="blue"
							disabled
							fullWidth
						>
							Banco de pesquisadores
						</RectangularButton>
					</Link>
				</ButtonsContainer>
			</ButtonsWrapper>

			{!!technologies?.length && (
				<TechnologiesSection>
					<SolutionsSection
						header={t('common:featuredTechnologies')}
						data={technologies}
						bgColor={colors.lightGray4}
						type="technology"
						padding="0rem 5%"
					/>
				</TechnologiesSection>
			)}

			{!!services.length && (
				<SolutionsSection
					header={t('common:featuredServices')}
					data={services}
					bgColor={colors.lightGray4}
					type="service"
				/>
			)}
		</>
	);
};

Home.getInitialProps = async ({ req }) => {
	let emailConfirmation = false;
	let changeEmail = false;
	let response = false;

	if (req && req.query && req.query.token && req.query.action) {
		const token = req.query.token.replace(' ', '+');
		const { action } = req.query;
		if (action === 'confirmAccount') {
			response = await apiPost('auth/confirm-account', {
				token,
				scope: 'web',
			});
			if (response.status === 200) {
				emailConfirmation = true;
			}
		} else if (action === 'changeEmail') {
			response = await apiPut('user/change-email', {
				token,
				scope: 'web',
			});
			if (response.status === 200) {
				changeEmail = true;
			}
		}
	}

	const technologies = await getTechnologies({
		embed: true,
		perPage: 4,
		orderBy: 'likes',
		order: 'DESC',
		status: 'published',
		taxonomy: 'category',
	});

	const services = await getServices({
		perPage: 4,
		orderBy: 'likes',
		order: 'DESC',
	});

	return {
		emailConfirmation,
		changeEmail,
		technologies,
		services,
		namespacesRequired: ['common', 'search', 'card', 'helper', 'pages'],
	};
};

Home.propTypes = {
	emailConfirmation: PropTypes.bool,
	technologies: PropTypes.arrayOf(PropTypes.object),
	services: PropTypes.arrayOf(PropTypes.object),
	changeEmail: PropTypes.bool,
};

Home.defaultProps = {
	emailConfirmation: false,
	technologies: [],
	services: [],
	changeEmail: false,
};

const ButtonsWrapper = styled.div`
	${({ theme: { colors } }) => css`
		background-color: ${colors.lightGray4};
	`}
`;

const ButtonsContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: grid;
		grid-row-gap: 1rem;
		align-items: center;
		margin: 0 auto;
		padding: 0 5%;
		max-width: 144rem;

		> a,
		> button {
			transform: translateY(calc(-50% - 1rem));
			width: 100%;
			height: 80px;
		}

		@media screen and (min-width: ${screens.medium}px) {
			grid-template-columns: 1fr 1fr 1fr;
			grid-column-gap: 3.2rem;
		}
	`}
`;

const TechnologiesSection = styled.div`
	> div {
		margin-top: -48px;
	}
`;

export default Home;
