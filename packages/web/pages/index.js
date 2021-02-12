import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { RectangularButton } from '../components/Button';
import { Hero } from '../components/Hero';
import { SolutionsSection } from '../components/SolutionsSection';
import { useModal, useTheme } from '../hooks';
import { getServices } from '../services';
import { apiPost, apiPut } from '../services/api';
import { getTechnologies } from '../services/technology';

const Home = ({ emailConfirmation, changeEmail, technologies, services }) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common']);
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
			<Hero />
			<ButtonsWrapper>
				<ButtonsContainer>
					<RectangularButton
						as="a"
						href="/announcements-bank"
						target="blank"
						variant="backgroundImage"
						backgroundUrl="/buttons/papers-background.png"
						colorVariant="green"
					>
						Banco de editais
					</RectangularButton>
					<RectangularButton
						as="a"
						href="/ideas-bank"
						target="blank"
						variant="backgroundImage"
						backgroundUrl="/buttons/paper-light.png"
						colorVariant="orange"
					>
						Banco de ideias
					</RectangularButton>
					<RectangularButton
						as="a"
						href="/researchers-bank"
						target="blank"
						variant="backgroundImage"
						backgroundUrl="/buttons/notebook-writing.png"
						colorVariant="blue"
					>
						Banco de pesquisadores
					</RectangularButton>
				</ButtonsContainer>
			</ButtonsWrapper>

			{technologies?.featured?.length && (
				<TechnologiesSection>
					<SolutionsSection
						header={t('common:featuredTechnologies')}
						data={technologies.featured}
						bgColor={colors.lightGray4}
						type="technology"
						padding="0rem 5%"
					/>
				</TechnologiesSection>
			)}

			{services.length && (
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

	const technologies = {};

	technologies.featured = await getTechnologies({
		embed: true,
		perPage: 4,
		orderBy: 'likes',
		order: 'DESC',
		status: 'published',
		taxonomy: 'category',
	});

	if (!Array.isArray(technologies.featured)) {
		technologies.featured = [];
	}

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
		namespacesRequired: ['common', 'search', 'card', 'helper'],
	};
};

Home.propTypes = {
	emailConfirmation: PropTypes.bool,
	technologies: PropTypes.shape({
		recent: PropTypes.arrayOf(PropTypes.object),
		featured: PropTypes.arrayOf(PropTypes.object),
	}),
	services: PropTypes.arrayOf(PropTypes.shape({})),
	changeEmail: PropTypes.bool,
};

Home.defaultProps = {
	emailConfirmation: false,
	technologies: {
		recent: [],
		featured: [],
	},
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

		a {
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
