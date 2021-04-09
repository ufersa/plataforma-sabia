import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';

import * as S from '../Common/hitCardStyles';
import { Likes } from '../../Card';

const TechnologyHitCard = ({
	hit: { id, title, description, thumbnail, likes, slug, institution },
}) => {
	return (
		<Link href={`/t/${slug}`} passHref target="_blank">
			<a>
				<S.Wrapper>
					<S.UpperContent>
						<S.ItemDetails>
							<div>
								<S.ThumbnailWrapper>
									<Image
										key={`${thumbnail?.url || 'card-image'}-${slug}`}
										layout="responsive"
										width={80}
										height={80}
										objectFit="cover"
										src={thumbnail?.url || '/card-image.jpg'}
									/>
								</S.ThumbnailWrapper>

								<S.Infos>
									<S.Title>{title}</S.Title>
									<S.Institution>{institution}</S.Institution>
									<S.Description>{description}</S.Description>
								</S.Infos>
							</div>
							<S.LikesWrapper data-testid="card-heart">
								<Likes id={id} count={likes} type="technology" />
							</S.LikesWrapper>
						</S.ItemDetails>
					</S.UpperContent>
				</S.Wrapper>
			</a>
		</Link>
	);
};

TechnologyHitCard.propTypes = {
	hit: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		description: PropTypes.string,
		thumbnail: PropTypes.shape({ url: PropTypes.string }),
		likes: PropTypes.number,
		institution: PropTypes.string,
		slug: PropTypes.string,
	}).isRequired,
};

export default TechnologyHitCard;
