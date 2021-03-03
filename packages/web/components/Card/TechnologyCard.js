import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { Link } from '../Link';
import { formatMoney } from '../../utils/helper';
import { ROLES as rolesEnum } from '../../utils/enums/api.enum';

import Likes from './Likes';

import {
	CardContainer,
	ImageContainer,
	Badge,
	Content,
	Price,
	MainTitle,
	TextContainer,
	InstitutionText,
	LikesWrapper,
	TextPill,
} from './styles';

const TechnologyCard = ({ id, slug, title, costs, thumbnail, likes, users, type }) => {
	return (
		<CardContainer>
			<Link href={`/t/${slug}`}>
				<ImageContainer>
					<Image
						src={thumbnail?.url || '/card-image.jpg'}
						alt={title}
						layout="responsive"
						width={256}
						height={304}
					/>
					<Badge bottom>Tecnologia</Badge>
				</ImageContainer>
			</Link>
			<Content>
				<LikesWrapper data-testid="card-heart">
					<Likes id={id} count={likes} type="technology" />
				</LikesWrapper>
				{!!costs.length && <Price>{formatMoney(costs[0].price)}</Price>}
				<Link href={`/t/${slug}`}>
					<MainTitle data-testid="card-title">{title}</MainTitle>
					<InstitutionText>
						{users?.find((user) => user?.pivot?.role === rolesEnum.OWNER)?.company}
					</InstitutionText>
				</Link>
				<TextContainer>
					<TextPill>{type}</TextPill>
				</TextContainer>
			</Content>
		</CardContainer>
	);
};

TechnologyCard.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	costs: PropTypes.arrayOf(
		PropTypes.shape({
			price: PropTypes.number,
		}),
	),
	thumbnail: PropTypes.shape({
		url: PropTypes.string,
	}),
	likes: PropTypes.number,
	slug: PropTypes.string.isRequired,
	users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	type: PropTypes.string.isRequired,
};

TechnologyCard.defaultProps = {
	thumbnail: null,
	likes: null,
	costs: [],
};

export default TechnologyCard;
