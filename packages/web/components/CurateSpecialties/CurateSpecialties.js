import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks';

const CurateSpecialties = ({ data = [] }) => {
	const { t } = useTranslation(['profile']);
	const { openModal } = useModal();

	const getChildrenCategory = (category) => {
		const foundCategory = data.find((c) => c.parent_id === category);
		return foundCategory ? foundCategory.term : 'Todas';
	};

	return (
		<Container>
			<h3>{t('profile:curateMySpecialties')}</h3>
			<List>
				{data.length > 0 ? (
					data
						.filter((category) => category.parent_id === null)
						.map((parent) => {
							const subCategory = data.find(
								(category) => category.parent_id === parent.id,
							);
							return (
								<ListItem key={`category_${parent.id}`}>
									<section>
										<b>{parent.term}</b> - {getChildrenCategory(parent.id)}
									</section>
									<button
										type="button"
										onClick={() =>
											openModal('curateSpecialtiesDelete', {
												speciality: [parent.id, subCategory.id],
												categories: data,
											})
										}
									>
										{t('helper:remove')}
									</button>
								</ListItem>
							);
						})
				) : (
					<p>Nenhuma área de atuação!</p>
				)}
			</List>
		</Container>
	);
};

CurateSpecialties.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const Container = styled.section`
	width: 100%;
	padding-left: 32px;
	flex: 1;

	h3 {
		border-bottom: 1px solid ${({ theme: { colors } }) => colors.lightGray4};
		padding-bottom: 24px;
		color: ${({ theme: { colors } }) => colors.lightGray2};
	}

	p {
		margin-top: 15px;
	}

	@media (max-width: ${({ theme: { screens } }) => screens.medium}px) {
		padding-left: 0;

		h3 {
			text-align: center;
			border-bottom: 0;
		}
	}
`;

const List = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const ListItem = styled.li`
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${({ theme: { colors } }) => colors.lightGray4};
	color: ${({ theme: { colors } }) => colors.lightGray2};

	button {
		background-color: transparent;
		border: 0;
		margin-left: auto;
		margin-right: 0;
		font-weight: 700;
		text-transform: uppercase;
		color: ${({ theme: { colors } }) => colors.red};
	}

	@media (max-width: ${({ theme: { screens } }) => screens.medium}px) {
		flex-direction: column;
		border: 1px solid ${({ theme: { colors } }) => colors.lightGray4};
		border-radius: 8px;
		padding: 20px;
		height: auto;
		margin-bottom: 20px;
		text-align: center;

		b {
			display: block;
		}

		a {
			margin-right: auto;
			margin-top: 10px;
		}
	}
`;

export default CurateSpecialties;
