import styled, { css } from 'styled-components';
import {
	AiFillFacebook,
	AiOutlineTwitter,
	AiOutlineWhatsApp,
	AiFillLinkedin,
	// AiFillCopy,
} from 'react-icons/ai';
import { Button } from '../../Button';

const defaultIconProps = ({ theme: { sizes } }) => ({
	size: sizes.largeIcon * 10,
});

export const Container = styled.div`
	${({ theme: { screens } }) => css`
		width: 50rem;
		padding: 2rem;

		h3 {
			font-size: 1.8rem;
			margin-bottom: 2rem;
			text-align: center;
		}

		@media (max-width: ${screens.medium}px) {
			width: 100%;
		}
	`}
`;

export const IconsWrapper = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex: 1;

		@media (max-width: ${screens.small}px) {
			flex-direction: column;
		}

		button {
			margin: 1rem;
			padding: 1rem;

			@media (max-width: ${screens.small}px) {
				width: 100%;
			}
		}
	`}
`;

export const IconButton = styled(Button)``;

export const FacebookIcon = styled(AiFillFacebook).attrs(defaultIconProps)``;

export const TwitterIcon = styled(AiOutlineTwitter).attrs(defaultIconProps)``;

export const WhatsAppIcon = styled(AiOutlineWhatsApp).attrs(defaultIconProps)``;

export const LinkedinIcon = styled(AiFillLinkedin).attrs(defaultIconProps)``;
