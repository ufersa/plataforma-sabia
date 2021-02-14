import React from 'react';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';

import { RectangularButton } from '../../Button';

import * as S from './styles';

const CartItem = ({ thumbnail, title, institution, price }) => {
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
							<S.Title>{title}</S.Title>
							<S.Institution>{institution}</S.Institution>
							<S.Price>{price}</S.Price>
						</S.Infos>
					</div>

					<RectangularButton colorVariant="red" variant="text">
						<FiTrash2 fontSize={14} />
						Remover
					</RectangularButton>
				</S.ItemDetails>
			</S.UpperContent>

			<S.LowerContent />
		</S.Wrapper>
	);
};

export default CartItem;
