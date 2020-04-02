import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { AiFillDollarCircle, AiOutlineGlobal, AiFillHeart } from 'react-icons/ai';
import { FaBatteryFull, FaCalendarAlt } from 'react-icons/fa';
import { GiRibbonMedal, GiSandsOfTime } from 'react-icons/gi';
import { MdLocationOn } from 'react-icons/md';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from '../../hooks';

import {
	CardContainer,
	ImageContainer,
	Content,
	UpContent,
	LocationContainer,
	LikesContainer,
	MainTitle,
	DownContent,
	TextContainer,
	IconsContainer,
} from './styles';

const Card = ({ title, src, place, date, likes, weeks, region, url }) => {
	const { colors, sizes } = useTheme();
	return (
		<CardContainer>
			<ImageContainer>
				<img src={src} alt={title} />
			</ImageContainer>
			<Content>
				<UpContent>
					<div>
						<LocationContainer>
							<MdLocationOn size={sizes.smallIcon} color={colors.primary} />
							<span>{region}</span>
						</LocationContainer>
						<LikesContainer>
							<AiFillHeart size={25} color={colors.primary} />
							<span>{likes}</span>
						</LikesContainer>
					</div>
					<MainTitle>
						<Link href={url} passHref>
							<a>{title}</a>
						</Link>
					</MainTitle>
				</UpContent>
				<DownContent>
					<TextContainer>
						<span>{place}</span>
						<div>
							<FaCalendarAlt size={20} color={colors.mediumGray} />
							<span>
								{formatDistance(date, new Date(), {
									addSuffix: true,
									locale: ptBR,
								})}
							</span>
						</div>
					</TextContainer>
					<IconsContainer>
						<div className="left">
							<GiSandsOfTime size={sizes.defaultIcon} color={colors.lightGray} />
							<span>{`${weeks} semanas`}</span>
						</div>
						<div className="right">
							<AiFillDollarCircle size={sizes.defaultIcon} color={colors.green} />
							<GiRibbonMedal size={sizes.defaultIcon} color={colors.mediumGray} />
							<AiOutlineGlobal size={sizes.defaultIcon} color={colors.green} />
							<FaBatteryFull size={sizes.defaultIcon} color={colors.cyan} />
						</div>
					</IconsContainer>
				</DownContent>
			</Content>
		</CardContainer>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	place: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(Date).isRequired,
	likes: PropTypes.number.isRequired,
	weeks: PropTypes.number.isRequired,
	region: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

export default Card;
