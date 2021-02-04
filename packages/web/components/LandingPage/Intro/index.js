import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

import * as S from './styles';

const Intro = ({ title, subtitle, button, link, image }) => {
	return (
		<S.Container>
			<S.TextContainer>
				<S.Title>{title}</S.Title>
				<S.Subtitle>{subtitle}</S.Subtitle>
				{button && <Button onClick={button.handleButtonClick}>{button.label}</Button>}
				{link && (
					<Button
						isLink
						linkType="scroll"
						activeClass="active"
						to={link.href}
						spy
						smooth
						duration={500}
						offset={-65}
					>
						{link.label}
					</Button>
				)}
			</S.TextContainer>
			<img src={image.src} alt={image.alt} />
		</S.Container>
	);
};

Intro.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	image: PropTypes.shape({
		src: PropTypes.string,
		alt: PropTypes.string,
	}).isRequired,
	button: PropTypes.shape({
		label: PropTypes.string,
		handleButtonClick: PropTypes.func,
	}),
	link: PropTypes.shape({
		label: PropTypes.string,
		href: PropTypes.string,
		scroll: PropTypes.bool,
	}),
};

Intro.defaultProps = {
	button: null,
	link: null,
};

export default Intro;
