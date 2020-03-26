import React from 'react';
import PropTypes from 'prop-types';
import { AiFillDollarCircle, AiOutlineGlobal, AiFillHeart } from 'react-icons/ai';
import { FaBatteryFull, FaCalendarAlt } from 'react-icons/fa';
import { GiRibbonMedal, GiSandsOfTime } from 'react-icons/gi';
import { MdLocationOn } from 'react-icons/md';

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

const Card = ({ title, src, place, date, likes, weeks, region }) => (
	<CardContainer>
		<ImageContainer>
			<img src={src} alt={title} />
		</ImageContainer>
		<Content>
			<UpContent>
				<div>
					<LocationContainer>
						<MdLocationOn size={15} color="#FF5406" />
						<p>{region}</p>
					</LocationContainer>
					<LikesContainer>
						<AiFillHeart size={25} color="#FF5406" />
						<span>{likes}</span>
					</LikesContainer>
				</div>
				<MainTitle>{title}</MainTitle>
			</UpContent>
			<DownContent>
				<TextContainer>
					<p>{place}</p>
					<div>
						<FaCalendarAlt size={20} color="#999" />
						<p>{date}</p>
					</div>
				</TextContainer>
				<IconsContainer>
					<div>
						<GiSandsOfTime size={30} color="#4F4F4F" />
						<p>{`${weeks} semanas`}</p>
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
	date: PropTypes.string.isRequired,
	likes: PropTypes.number.isRequired,
	weeks: PropTypes.number.isRequired,
	region: PropTypes.string.isRequired,
};

export default Card;
