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
	Content,
	UpContent,
	LocationContainer,
	LikesContainer,
	MainTitle,
	TextContainer,
	IconsContainer,
} from './styles';

const Card = ({ title, image, place, date, likes, weeks, region, url }) => {
	const { colors } = useTheme();
	return (
		<CardContainer>
			<ImageContainer>
				<img src={image} alt={title} />
			</ImageContainer>
			<Content>
				<UpContent>
					<div>
						<LocationContainer>
							<MdLocationOn color={colors.primary} />
							<span>{region}</span>
						</LocationContainer>
						<LikesContainer>
							<AiFillHeart color={colors.primary} />
							<span>{likes}</span>
						</LikesContainer>
					</div>
					<MainTitle>
						<Link href={url}>{title}</Link>
					</MainTitle>
				</UpContent>
				<TextContainer>
					<span>{place}</span>
					<div>
						<FaCalendarAlt color={colors.mediumGray} />
						<span>{formatDistance(date)}</span>
					</div>
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
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	place: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(Date).isRequired,
	likes: PropTypes.number.isRequired,
	weeks: PropTypes.number.isRequired,
	region: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

export default Card;
