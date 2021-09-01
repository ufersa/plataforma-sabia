import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from '../components/head';
import { RectangularButton } from '../components/Button';
import { Hero } from '../components/Hero';
import { SolutionsSection } from '../components/SolutionsSection';
import { useTheme } from '../hooks';
import { internal as internalPages } from '../utils/enums/pages.enum';
import { getServices, apiPost, apiPut, getTechnologies } from '../services';
import AnnouncementBanner from '../components/AnnouncementBanner';
import { toast } from '../components/Toast';

const Home = ({ emailConfirmation, changeEmail, technologies, services, heroImage }) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common', 'pages']);
	const router = useRouter();

	useEffect(() => {
		if (emailConfirmation) {
			toast.success(t('common:verifiedEmail'));
			router.push(internalPages.signIn);
		} else if (changeEmail) {
			toast.success(t('common:updatedEmail'));
			router.push(internalPages.signIn);
		}
	}, [emailConfirmation, changeEmail, t, router]);

	return (
		<>
			<Head
				title={t('pages:home.title')}
				description={t('pages:home.description')}
				keywords={t('pages:home.keywords')}
			/>
			<Hero heroImage={heroImage} />
			<ButtonsWrapper>
				<ButtonsContainer>
					<Link href={internalPages.announcements} passHref>
						<RectangularButton
							as="a"
							variant="backgroundImage"
							backgroundUrl="/buttons/papers-background.png"
							colorVariant="green"
						>
							Banco de editais
						</RectangularButton>
					</Link>
					<Link href={internalPages.ideas} passHref>
						<RectangularButton
							as="a"
							variant="backgroundImage"
							backgroundUrl="/buttons/paper-light.png"
							colorVariant="orange"
						>
							Banco de ideias
						</RectangularButton>
					</Link>
					<Link href={internalPages.researchers} passHref>
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

			<AnnouncementBanner />

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

	const heroImgs = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'];
	const heroIndexImg = Math.floor(Math.random() * heroImgs.length);

	return {
		emailConfirmation,
		changeEmail,
		technologies,
		services,
		heroImage: `/hero/${heroImgs[heroIndexImg]}`,
	};
};

Home.propTypes = {
	emailConfirmation: PropTypes.bool,
	technologies: PropTypes.arrayOf(PropTypes.object),
	services: PropTypes.arrayOf(PropTypes.object),
	changeEmail: PropTypes.bool,
	heroImage: PropTypes.string.isRequired,
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
