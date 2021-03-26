import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';

import * as S from '../Common/hitCardStyles';
import { Likes } from '../../Card';
import { formatMoney, getMeasureUnitLabel } from '../../../utils/helper';
import { MEASURE_UNIT as measureUnitEnum } from '../../../utils/enums/api.enum';
import { RectangularButton } from '../../Button';
import { useShoppingCart } from '../../../hooks';

const ServiceHitCard = ({
	hit: { id, name, description, price, thumbnail, likes, institution, measure_unit, user },
}) => {
	const { addItem, itemIsInCart } = useShoppingCart();

	const handleAddToCart = () => {
		addItem({
			id,
			name,
			price,
			thumbnail,
			institution: user.institution?.name || '',
			type: 'service',
			quantity: 1,
			measureUnit: measure_unit,
		});
	};

	const serviceIsInCart = itemIsInCart(id, 'service');

	return (
		<S.Wrapper>
			<S.UpperContent>
				<S.ItemDetails>
					<div>
						<S.ThumbnailWrapper>
							<Image
								key={`${thumbnail?.url || 'card-image'}-${id}`}
								layout="responsive"
								width={80}
								height={80}
								objectFit="cover"
								src={thumbnail?.url || '/card-image.jpg'}
							/>
						</S.ThumbnailWrapper>

						<S.Infos>
							<S.Title>{name}</S.Title>
							<S.Institution>{institution}</S.Institution>
							<S.Description>{description}</S.Description>
							<S.PriceWrapper>
								<S.Price>
									{formatMoney(price)}
									{measure_unit !== measureUnitEnum.other && (
										<span>/{getMeasureUnitLabel(measure_unit)}</span>
									)}
								</S.Price>
								<RectangularButton
									colorVariant="green"
									variant="filled"
									onClick={handleAddToCart}
									disabled={serviceIsInCart}
								>
									<FiShoppingCart fontSize={18} />
									{serviceIsInCart ? 'Item no carrinho' : 'Adicionar ao carrinho'}
								</RectangularButton>
							</S.PriceWrapper>
						</S.Infos>
					</div>
					<S.LikesWrapper data-testid="card-heart">
						<Likes id={id} count={likes} type="service" />
					</S.LikesWrapper>
				</S.ItemDetails>
			</S.UpperContent>
		</S.Wrapper>
	);
};

ServiceHitCard.propTypes = {
	hit: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		description: PropTypes.string,
		price: PropTypes.number,
		thumbnail: PropTypes.shape({ url: PropTypes.string }),
		likes: PropTypes.number,
		institution: PropTypes.string,
		measure_unit: PropTypes.string,
		user: PropTypes.shape({
			institution: PropTypes.shape({
				name: PropTypes.string,
			}),
		}),
	}).isRequired,
};

export default ServiceHitCard;
