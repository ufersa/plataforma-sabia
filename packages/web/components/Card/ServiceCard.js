import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';

import { formatMoney } from '../../utils/helper';
import { RectangularButton } from '../Button';

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
	ButtonContent,
} from './styles';

const ServiceCard = ({ id, name, price, thumbnail, likes, user }) => {
	return (
		<CardContainer>
			<ImageContainer>
				<Image
					src={thumbnail?.url || '/card-image.jpg'}
					alt={name}
					layout="responsive"
					width={256}
					height={304}
				/>
				<Badge bottom>Serviço</Badge>
			</ImageContainer>
			<Content>
				<LikesWrapper data-testid="card-heart">
					<Likes id={id} count={likes} type="service" />
				</LikesWrapper>
				{!!price && <Price>{formatMoney(price)}</Price>}
				<MainTitle data-testid="card-title">{name}</MainTitle>
				<InstitutionText>{user.institution?.name}</InstitutionText>
				<TextContainer>
					<RectangularButton variant="filled" colorVariant="green">
						<ButtonContent>
							<FiShoppingCart fontSize={18} />
							Adicionar no carrinho
						</ButtonContent>
					</RectangularButton>
				</TextContainer>
			</Content>
		</CardContainer>
	);
};

ServiceCard.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	thumbnail: PropTypes.string,
	likes: PropTypes.number,
	user: PropTypes.shape({
		institution: PropTypes.shape({ name: PropTypes.string }),
	}).isRequired,
};

ServiceCard.defaultProps = {
	thumbnail: null,
	likes: null,
};

export default ServiceCard;
