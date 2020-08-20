import styled, { css } from 'styled-components';
import * as Layout from '../../Common/Layout';
import { CheckBoxField } from '../../Form';
import * as MapAndAttachments from '../MapAndAttachments/styles';

export const Cell = styled(Layout.Cell)`
	width: 100%;
`;

export const Row = styled.div`
	display: flex;
	align-items: flex-start;

	& > *:not(:first-child):not(:last-child) {
		margin: 0 10px;
	}

	@media (max-width: ${({ theme }) => theme.screens.large}px) {
		flex-direction: column;
		margin-top: 1.5rem;
	}
`;

export const Wrapper = styled.div`
	margin-bottom: 4rem;
`;

export const Checkbox = styled(CheckBoxField)`
	div {
		text-transform: uppercase !important;
		a {
			border: 1px solid red;
			padding: 0;
		}
	}
`;

export const UploadsTitle = styled.span`
	${({ theme: { colors } }) => css`
		display: block;
		font-weight: 500;
		font-size: 1.4rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
		color: ${colors.lightGray};

		&:not(:first-child) {
			margin-top: 1rem;
		}
	`}
`;

export const UploadedDocuments = styled(MapAndAttachments.UploadedDocuments)``;

export const UploadedImages = styled(MapAndAttachments.UploadedImages)``;

export const IconRow = styled(MapAndAttachments.IconRow)``;

export const Media = styled(MapAndAttachments.Media)``;

export const IconLink = styled(MapAndAttachments.IconLink)``;
