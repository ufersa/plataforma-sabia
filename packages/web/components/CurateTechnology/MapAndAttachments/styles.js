import styled, { css } from 'styled-components';
import * as MapAndAttachments from '../../TechnologyForm/MapAndAttachments/styles';

export const UploadsTitle = styled.span`
	${({ theme: { colors } }) => css`
		display: block;
		font-weight: 500;
		font-size: 1.4rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
		color: ${colors.lightGray};

		&:not(:first-child) {
			margin-top: 2.4rem;
		}
	`}
`;

export const UploadedDocuments = styled(MapAndAttachments.UploadedDocuments)``;

export const UploadedImages = styled(MapAndAttachments.UploadedImages)`
	grid-template-columns: repeat(auto-fill, 20%);
`;

export const Media = styled(MapAndAttachments.Media)`
	cursor: pointer;
	filter: opacity(1);
`;

export const IconRow = styled(MapAndAttachments.IconRow)``;

export const IconLink = styled(MapAndAttachments.IconLink)``;

export const ImageCaption = styled.p`
	${({ theme: { colors } }) => css`
		font-size: 1.2rem;
		margin-top: -1rem;
		color: ${colors.lightGray};
	`}
`;
