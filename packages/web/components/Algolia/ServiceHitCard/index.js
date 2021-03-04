import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import * as S from '../Common/hitCardStyles';
import { Likes } from '../../Card';
import { formatMoney, getMeasureUnitLabel } from '../../../utils/helper';

const ServiceHitCard = ({
	hit: { id, name, description, price, thumbnail, likes, institution, measure_unit },
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
								src={thumbnail?.url || '/card-image.jpg'}
							/>
						</S.ThumbnailWrapper>

						<S.Infos>
							<S.Title>{name}</S.Title>
							<S.Institution>{institution}</S.Institution>
							<S.Description>{description}</S.Description>
							<S.Price>
								{formatMoney(price)}
								<span>/{getMeasureUnitLabel(measure_unit)}</span>
							</S.Price>
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
		institution: PropTypes.shape({}),
		measure_unit: PropTypes.string,
	}).isRequired,
};

export default ServiceHitCard;
