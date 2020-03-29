import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { AiFillDollarCircle, AiOutlineGlobal, AiFillHeart } from 'react-icons/ai';
import { FaBatteryFull, FaCalendarAlt } from 'react-icons/fa';
import { GiRibbonMedal, GiSandsOfTime } from 'react-icons/gi';
import { MdLocationOn } from 'react-icons/md';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

const Card = ({ title, src, place, date, likes, weeks, region, url }) => (
	<CardContainer>
		<ImageContainer>
			<img src={src} alt={title} />
		</ImageContainer>
		<Content>
			<UpContent>
				<div>
					<LocationContainer>
						<MdLocationOn size={15} color="#FF5406" />
						<span>{region}</span>
					</LocationContainer>
					<LikesContainer>
						<AiFillHeart size={25} color="#FF5406" />
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
						<FaCalendarAlt size={20} color="#999" />
						<span>
							{formatDistance(date, new Date(), { addSuffix: true, locale: ptBR })}
						</span>
					</div>
				</TextContainer>
				<IconsContainer>
					<div>
						<GiSandsOfTime size={30} color="#4F4F4F" />
						<span>{`${weeks} semanas`}</span>
					</div>
					<div>
						<AiFillDollarCircle size={30} color="#219653" />
						<GiRibbonMedal size={30} color="#BDBDBD" />
						<AiOutlineGlobal size={30} color="#219653" />
						<FaBatteryFull size={30} color="#56CCF2" />
					</div>
				</IconsContainer>
			</DownContent>
		</Content>
	</CardContainer>
);

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
