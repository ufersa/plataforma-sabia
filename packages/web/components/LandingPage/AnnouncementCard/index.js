import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { formatMoney, limitTextChar } from '../../../utils/helper';

import * as S from './styles';
import { Column, Row } from '../../Common';
import { RectangularButton } from '../../Button';

const MAX_DESC_LENGTH = 142;

const AnnouncementCard = ({
	hit: {
		id,
		title,
		institution,
		description,
		announcement_number,
		start_date,
		end_date,
		financial_resources,
		targetAudiences = [],
		keywords,
		url,
		comment,
	},
}) => {
	const [toggleShowMore, setToggleShowMore] = useState(false);

	const handleToggleShowMore = () => {
		setToggleShowMore((previousState) => !previousState);
	};

	return (
		<S.Container key={id}>
			<S.Title>{title}</S.Title>
			<S.Institution>{institution?.name}</S.Institution>
			<S.Description>
				{toggleShowMore ? description : limitTextChar(description, MAX_DESC_LENGTH)}
			</S.Description>

			{toggleShowMore && (
				<>
					<Row>
						<Column noPadding>
							<S.InfoText>
								<strong>Número do edital:</strong> {announcement_number}
							</S.InfoText>
							<S.InfoText>
								<strong>Inscrições:</strong> {start_date} à {end_date}
							</S.InfoText>
						</Column>
						<Column noPadding>
							{!!financial_resources && (
								<S.InfoText>
									<strong>Recursos financeiros:</strong>{' '}
									{formatMoney(financial_resources)}
								</S.InfoText>
							)}
							<S.InfoText>
								<strong>Público-alvo:</strong> {targetAudiences.join(',')}
							</S.InfoText>
						</Column>
					</Row>

					{!!comment && (
						<Row>
							<S.InfoText>
								<strong>Observações: </strong>
								{comment}
							</S.InfoText>
						</Row>
					)}
				</>
			)}

			<S.PillWrapper>
				{keywords?.map((keyword) => (
					<S.Pill key={keyword}>{keyword}</S.Pill>
				))}
			</S.PillWrapper>

			{toggleShowMore && (
				<RectangularButton
					as="a"
					href={url}
					target="_blank"
					variant="filled"
					colorVariant="green"
					autoX
				>
					Ir para o site do edital
				</RectangularButton>
			)}

			<RectangularButton onClick={handleToggleShowMore} colorVariant="green" autoX>
				Mostrar {toggleShowMore ? 'menos' : 'mais'}
			</RectangularButton>
		</S.Container>
	);
};

AnnouncementCard.propTypes = {
	hit: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		institution: PropTypes.shape({
			name: PropTypes.string,
		}),
		description: PropTypes.string,
		announcement_number: PropTypes.string,
		start_date: PropTypes.string,
		end_date: PropTypes.string,
		financial_resources: PropTypes.number,
		targetAudiences: PropTypes.arrayOf(PropTypes.shape({})),
		keywords: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
				term: PropTypes.string,
			}),
		),
		url: PropTypes.string,
		comment: PropTypes.string,
	}).isRequired,
};

export default AnnouncementCard;
