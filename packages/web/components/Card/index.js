import React from 'react';
import PropTypes from 'prop-types';
import { AiFillDollarCircle, AiOutlineGlobal, AiFillHeart } from 'react-icons/ai';
import { FaBatteryFull, FaCalendarAlt } from 'react-icons/fa';
import { GiRibbonMedal, GiSandsOfTime } from 'react-icons/gi';
import { MdLocationOn } from 'react-icons/md';
import Link from '../Link';
import { useTheme } from '../../hooks';
import { formatDistance } from '../../utils/helper';

import {
	CardContainer,
	ImageContainer,
	Badge,
	Content,
	UpContent,
	LocationContainer,
	LikesContainer,
	MainTitle,
	TextContainer,
	CalendarText,
	PlaceText,
	IconsContainer,
} from './styles';

const Card = ({ title, category, price, image, place, date, likes, weeks, region, url }) => {
	const { colors } = useTheme();
	return (
		<Link href={url}>
			<CardContainer>
				<ImageContainer>
					<img src={image} alt={title} />
					<Badge top>{category}</Badge>
					<Badge bottom>R$ {price}</Badge>
				</ImageContainer>
				<Content>
					<UpContent>
						<LocationContainer>
							<MdLocationOn color={colors.primary} />
							<span>{region}</span>
						</LocationContainer>
						<LikesContainer>
							<AiFillHeart color={colors.primary} />
							<span>{likes}</span>
						</LikesContainer>
					</UpContent>
					<MainTitle>{title}</MainTitle>
					<TextContainer>
						<PlaceText>{place}</PlaceText>
						<CalendarText>
							<FaCalendarAlt color={colors.mediumGray} />
							<span>{formatDistance(date)}</span>
						</CalendarText>
					</TextContainer>
					<IconsContainer>
						<div className="left">
							<GiSandsOfTime color={colors.lightGray} />
							<span>{`${weeks} semanas`}</span>
						</div>
						<div className="right">
							<AiFillDollarCircle color={colors.green} />
							<GiRibbonMedal color={colors.mediumGray} />
							<AiOutlineGlobal color={colors.green} />
							<FaBatteryFull color={colors.cyan} />
						</div>
					</IconsContainer>
				</Content>
			</CardContainer>
		</Link>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	place: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(Date).isRequired,
	likes: PropTypes.number.isRequired,
	weeks: PropTypes.number.isRequired,
	region: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

export default Card;
