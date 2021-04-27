import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useModal } from '../../hooks';

const CurateSpecialties = ({ data = [] }) => {
	const { t } = useTranslation(['profile']);
	const { openModal } = useModal();

	return (
		<Container>
			<h3>{t('profile:curateMySpecialties')}</h3>
			<List>
				{data.length ? (
					data
						.filter((category) => category.parent_id)
						.map((parent) => {
							const foundCategory = data.find(
								(category) => category.id === parent.parent_id,
							);
							return (
								<ListItem key={`category_${parent.id}`}>
									<section>
										<b>{foundCategory?.term}</b> {parent.term}
									</section>
									<Button
										type="button"
										onClick={() =>
											openModal('curateSpecialtiesDelete', {
												speciality: [foundCategory.id, parent.id],
												categories: data,
											})
										}
									>
										{t('helper:remove')}
									</Button>
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

	b {
		position: relative;
		padding-right: 20px;

		&::before {
			position: absolute;
			right: 5px;
			content: '-';
		}
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
			padding-right: 0;

			&::before {
				content: '';
			}
		}
	}
`;

const Button = styled.button`
	background: none;
	color: ${({ theme: { colors } }) => colors.red};
	padding: 0.4rem 0.8rem;
	display: flex;
	align-items: center;
	align-self: center;
	border: none;
	outline: none;

	text-transform: uppercase;
	font-weight: bold;
	font-size: 1.4rem;
	line-height: 2.4rem;

	margin: 0 0 0 auto;

	&:hover,
	&:focus {
		color: ${({ theme: { colors } }) => colors.white};
		background: ${({ theme: { colors } }) => colors.red};
	}

	@media (max-width: ${({ theme: { screens } }) => screens.medium}px) {
		margin: 20px auto 0;
	}
`;

export default CurateSpecialties;
