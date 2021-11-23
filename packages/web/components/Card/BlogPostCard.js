import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../Link';
import { formatDateLong } from '../../utils/helper';
import { getServiceTypeThumbnail } from '../../utils/service';
import { CardContainer, ImageContainer, Content, ShortTitle, PublishedDate } from './styles';

const BlogPostCard = ({ published_at, thumbnail, locale, title, type, url }) => {
	const serviceThumbnail = thumbnail || getServiceTypeThumbnail(type?.trim());
	const formattedDate = formatDateLong(published_at, locale, { month: 'short' })
		.toLowerCase()
		.split(' de ')
		.join(' ');

	return (
		<Link href={url} target="_blank">
			<CardContainer>
				<ImageContainer short>
					<img src={serviceThumbnail} alt={title} />
				</ImageContainer>
				<Content>
					<ShortTitle data-testid="card-title">{title}</ShortTitle>
					<PublishedDate>{formattedDate}</PublishedDate>
				</Content>
			</CardContainer>
		</Link>
	);
};

BlogPostCard.propTypes = {
	published_at: PropTypes.string,
	locale: PropTypes.string,
	thumbnail: PropTypes.string,
	title: PropTypes.string,
	type: PropTypes.string,
	url: PropTypes.string,
};

BlogPostCard.defaultProps = {
	published_at: Date.now(),
	thumbnail: '',
	locale: 'pt-BR',
	title: '',
	type: '',
	url: '',
};

export default BlogPostCard;
