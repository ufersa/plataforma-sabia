import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';

import { QuantityField } from '../../Form';
import { RectangularButton } from '../../Button';
import { formatMoney, getMeasureUnitLabel } from '../../../utils/helper';
import { MEASURE_UNIT as measureUnitEnum } from '../../../utils/enums/api.enum';
import * as S from './styles';

const CartItem = ({
	thumbnail,
	name,
	institution,
	price,
	measureUnit,
	quantity,
	form,
	onRemoveFromCart,
	onUpdateItem,
}) => {
	return (
		<S.Wrapper>
			<S.UpperContent>
				<S.ItemDetails>
					<div>
						<S.ThumbnailWrapper>
							<Image
								layout="responsive"
								width={80}
								height={80}
								src={thumbnail || '/card-image.jpg'}
							/>
						</S.ThumbnailWrapper>

						<S.Infos>
							<S.Title>{name}</S.Title>
							<S.Institution>{institution}</S.Institution>
							<S.Price>{`R$ ${formatMoney(price, false)}${
								measureUnit && measureUnit !== measureUnitEnum.other
									? `/${getMeasureUnitLabel(measureUnit)}`
									: ''
							}`}</S.Price>
						</S.Infos>
					</div>

					<RectangularButton colorVariant="red" variant="text" onClick={onRemoveFromCart}>
						<FiTrash2 fontSize={14} />
						Remover
					</RectangularButton>
				</S.ItemDetails>
			</S.UpperContent>

			<S.LowerContent>
				<QuantityField
					form={form}
					labelPlacement="left"
					defaultValue={quantity}
					minValue={1}
					onChange={(newQuantity) => onUpdateItem({ quantity: newQuantity })}
				/>
				<span>{formatMoney(price * quantity)}</span>
			</S.LowerContent>
		</S.Wrapper>
	);
};

CartItem.propTypes = {
	thumbnail: PropTypes.string,
	name: PropTypes.string.isRequired,
	institution: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	measureUnit: PropTypes.string,
	quantity: PropTypes.number,
	form: PropTypes.shape({}).isRequired,
	onRemoveFromCart: PropTypes.func.isRequired,
	onUpdateItem: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
	thumbnail: '',
	measureUnit: '',
	quantity: 1,
};

export default CartItem;
