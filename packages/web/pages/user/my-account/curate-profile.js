import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { CurateSpecialties, CurateFormSpecialties } from '../../../components/CurateSpecialties';
import HeaderProfile from '../../../components/HeaderProfile';
import { ROLES as rolesEnum } from '../../../utils/enums/api.enum';
import { getReviewerUser } from '../../../services/user';

const CurateProfile = ({ categories = [] }) => {
	const [currentCategories, setCurrentCategories] = useState(categories);
	// const normalizeCategories = categories
	// 	.filter((category) => category.parent_id !== null)
	// 	.map((category) => {
	// 		const categoryParent = currentCategories.find(
	// 			(innerCategory) => innerCategory.id === category.parent_id,
	// 		);
	// 		const categoryLabel = categoryParent?.term;
	// 		const categoryValue = categoryParent?.id.toString();
	// 		return {
	// 			category: {
	// 				label: categoryLabel,
	// 				value: categoryValue,
	// 			},
	// 			subCategory: {
	// 				label: category.term,
	// 				value: category.id.toString(),
	// 			},
	// 		};
	// 	});

	useEffect(() => {
		setCurrentCategories(categories);
	}, [categories]);

	return (
		<Container>
			<Protected userRole={rolesEnum.REVIEWER}>
				<UserProfile />
				<MainContentContainer>
					<HeaderProfile />
					<Grid>
						<Sidebar>
							<CurateFormSpecialties defaultValues={categories} />
						</Sidebar>
						<CurateSpecialties data={currentCategories} />
					</Grid>
				</MainContentContainer>
			</Protected>
		</Container>
	);
};

CurateProfile.getInitialProps = async () => {
	const {
		data: { categories },
	} = await getReviewerUser();
	return { categories };
};

CurateProfile.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const Container = styled.div`
	display: flex;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.colors.whiteSmoke};
	padding: 3rem 4rem 6rem;

	> section:first-child {
		margin-right: 4rem;
	}

	@media screen and (max-width: 950px) {
		flex-direction: column;

		> section:first-child {
			margin-bottom: 1rem;
		}
	}
`;

export const MainContentContainer = styled.section`
	width: 100%;
`;

const Grid = styled.section`
	width: 100%;
	display: flex;
	margin-top: 40px;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		margin-top: 80px;
		flex-direction: column;
	}
`;

const Sidebar = styled.aside`
	width: 340px;
	padding-left: 32px;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 100%;
		padding-left: 0;
		margin-bottom: 40px;
	}
`;

export default CurateProfile;
