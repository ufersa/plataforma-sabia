import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

const Item = ({ title, image, description, link, buttonDisabled }) => {
	return (
		<S.Wrapper>
			<S.Title>{title}</S.Title>
			<S.Container>
				<S.Image src={image.src} alt={image.alt} />
				<S.Body>
					<S.Description>{description}</S.Description>
					<S.Link href={link.href} buttonDisabled={buttonDisabled}>
						{link.label}
					</S.Link>
				</S.Body>
			</S.Container>
		</S.Wrapper>
	);
};

Item.propTypes = {
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	image: PropTypes.shape({
		src: PropTypes.string,
		alt: PropTypes.string,
	}).isRequired,
	description: PropTypes.string.isRequired,
	link: PropTypes.shape({
		href: PropTypes.string,
		label: PropTypes.string,
	}).isRequired,
	buttonDisabled: PropTypes.bool,
};

Item.defaultProps = {
	buttonDisabled: false,
};

export default Item;
