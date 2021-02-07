import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { Link } from '../Link';
import { formatMoney } from '../../utils/helper';
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
} from './styles';

const Card = ({ id, title, price, thumbnail, likes, url, institution }) => {
	const { t } = useTranslation(['card', 'helper']);
	const dynamicTechnologyRoute = '/t/[technology]';

	return (
		<CardContainer>
			<Link href={dynamicTechnologyRoute} as={url}>
				<ImageContainer>
					<Image
						src={thumbnail || '/card-image.jpg'}
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
					<Likes id={id} count={likes} />
				</LikesWrapper>
				{!!price && <Price>{formatMoney(price)}</Price>}
				<Link href={dynamicTechnologyRoute} as={url}>
					<MainTitle data-testid="card-title">{title}</MainTitle>
				</Link>
				<TextContainer>
					<InstitutionText>
						<HiOutlineLocationMarker fontSize={18} />
						{institution || t('card:notDefinedInstitution')}
					</InstitutionText>
				</TextContainer>
			</Content>
		</CardContainer>
	);
};

Card.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	institution: PropTypes.string,
	thumbnail: PropTypes.string,
	likes: PropTypes.number,
	url: PropTypes.string.isRequired,
};

Card.defaultProps = {
	institution: '',
	thumbnail: null,
	likes: null,
};

export default Card;
