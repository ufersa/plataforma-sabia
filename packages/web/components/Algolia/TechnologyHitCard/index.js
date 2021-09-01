import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Likes } from '../../Card';
import * as S from '../Common/hitCardStyles';
import { internal as internalPages } from '../../../utils/enums/pages.enum';

const TechnologyHitCard = ({
	hit: { id, title, description, thumbnail, likes, slug, institution },
}) => {
	return (
		<Link
			href={internalPages.technologyDetails.replace(':slug', slug)}
			passHref
			target="_blank"
		>
			<a>
				<S.Wrapper>
					<S.UpperContent>
						<S.ItemDetails>
							<div>
								<S.ThumbnailWrapper imageWidth={10} imageHeight={10}>
									<img src={thumbnail?.url || '/card-image.jpg'} alt={title} />
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
