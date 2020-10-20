import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaLock, FaUnlock } from 'react-icons/fa';
import { Link } from '../Link';
import { useTheme } from '../../hooks';
import { formatDistance } from '../../utils/helper';
import Likes from './Likes';

import {
	CardContainer,
	ImageContainer,
	Badge,
	Content,
	UpContent,
	PrivateContainer,
	MainTitle,
	TextContainer,
	CalendarText,
	InstitutionText,
} from './styles';

const Card = ({
	id,
	title,
	category,
	privateTechnology,
	thumbnail,
	date,
	likes,
	url,
	institution,
}) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['card', 'helper']);
	const dynamicTechnologyRoute = '/t/[technology]';

	return (
		<CardContainer>
			<Link href={dynamicTechnologyRoute} as={url}>
				<ImageContainer>
					<img src={thumbnail || 'card-image.jpg'} alt={title} />
					{!!category && <Badge bottom>{category}</Badge>}
				</ImageContainer>
			</Link>
			<Content>
				<UpContent>
					<PrivateContainer>
						{privateTechnology ? (
							<>
								<FaLock color={colors.secondary} />
								<span>{t('card:privateTechnology')}</span>
							</>
						) : (
							<>
								<FaUnlock color={colors.secondary} />
								<span>{t('card:publicTechnology')}</span>
							</>
						)}
					</PrivateContainer>
					<div data-testid="card-heart">
						<Likes id={id} count={likes} />
					</div>
				</UpContent>
				<Link href={dynamicTechnologyRoute} as={url}>
					<MainTitle data-testid="card-title">{title}</MainTitle>
				</Link>
				<TextContainer>
					<InstitutionText>
						{institution || t('card:notDefinedInstitution')}
					</InstitutionText>
					<CalendarText>
						<FaCalendarAlt color={colors.secondary} />
						<span>{formatDistance(t, date)}</span>
					</CalendarText>
				</TextContainer>
			</Content>
		</CardContainer>
	);
};

Card.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	privateTechnology: PropTypes.bool.isRequired,
	institution: PropTypes.string,
	thumbnail: PropTypes.string,
	date: PropTypes.instanceOf(Date).isRequired,
	likes: PropTypes.number,
	url: PropTypes.string.isRequired,
};

Card.defaultProps = {
	institution: '',
	thumbnail: null,
	likes: null,
};

export default Card;
