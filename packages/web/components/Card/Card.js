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

const Card = ({ id, title, price, thumbnail, likes, url, institution, imageLabel }) => {
	const { t } = useTranslation(['card', 'helper']);

	return (
		<CardContainer>
			<Link href={url}>
				<ImageContainer>
					<Image
						src={thumbnail || '/card-image.jpg'}
						alt={title}
						layout="responsive"
						width={256}
						height={304}
					/>
					{!!imageLabel && <Badge bottom>{imageLabel}</Badge>}
				</ImageContainer>
			</Link>
			<Content>
				<LikesWrapper data-testid="card-heart">
					<Likes id={id} count={likes} />
				</LikesWrapper>
				{!!price && <Price>{formatMoney(price)}</Price>}
				<Link href={url}>
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
	imageLabel: PropTypes.oneOf(['Tecnologia', 'Serviço', undefined]),
};

Card.defaultProps = {
	institution: '',
	thumbnail: null,
	likes: null,
	imageLabel: undefined,
};

export default Card;
