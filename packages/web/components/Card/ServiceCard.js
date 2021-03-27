import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';

import { formatMoney } from '../../utils/helper';
import { getServiceTypeThumbnail } from '../../utils/service';
import { useShoppingCart } from '../../hooks';
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

const ServiceCard = ({
	id,
	name,
	price,
	thumbnail,
	likes,
	user,
	measure_unit: measureUnit,
	type,
}) => {
	const { addItem, itemIsInCart } = useShoppingCart();

	const handleAddToCart = () => {
		addItem({
			id,
			name,
			price,
			thumbnail,
			institution: user.institution?.initials || '',
			type: 'service',
			quantity: 1,
			measureUnit,
		});
	};

	const serviceIsInCart = itemIsInCart(id, 'service');
	const serviceThumbnail = thumbnail?.url || getServiceTypeThumbnail(type?.trim());

	return (
		<CardContainer>
			<ImageContainer>
				<Image
					key={`${serviceThumbnail}-${id}`}
					src={serviceThumbnail}
					alt={name}
					layout="responsive"
					width={254}
					height={254}
					objectFit="cover"
				/>
				<Badge bottom>Serviço</Badge>
			</ImageContainer>
			<Content>
				<LikesWrapper data-testid="card-heart">
					<Likes id={id} count={likes} type="service" />
				</LikesWrapper>
				{!!price && <Price>{formatMoney(price)}</Price>}
				<MainTitle data-testid="card-title">{name}</MainTitle>
				<InstitutionText>{user?.institution?.initials}</InstitutionText>
				<TextContainer>
					<RectangularButton
						variant="filled"
						colorVariant="green"
						onClick={handleAddToCart}
						disabled={serviceIsInCart}
					>
						<ButtonContent>
							<FiShoppingCart fontSize={18} />
							{serviceIsInCart ? 'Item no carrinho' : 'Adicionar ao carrinho'}
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
		institution: PropTypes.shape({ initials: PropTypes.string }),
	}).isRequired,
	measure_unit: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

ServiceCard.defaultProps = {
	thumbnail: null,
	likes: 0,
};

export default ServiceCard;
