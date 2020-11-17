import React from 'react';
import styled, { css } from 'styled-components';
import { FaFilePdf } from 'react-icons/fa';
import { useModal, useTechnology } from '../../../../hooks';
import * as Layout from '../../../Common/Layout';
import Section from '../Section';
import Videos from '../Videos';
import * as MapAndAttachments from '../../../TechnologyForm/MapAndAttachments/styles';

const Attachments = () => {
	const { technology } = useTechnology();
	const { openModal } = useModal();
	const { images = [] } = technology.attachments;

	return (
		<Layout.Cell>
			<Section title="Fotos" hideWhenIsEmpty={false}>
				<UploadsTitle>Fotos da Tecnologia</UploadsTitle>
				{images?.length ? (
					<>
						<UploadedImages>
							{images.map((element, index) => (
								<IconRow key={element.url}>
									<Media
										src={element.url}
										role="button"
										aria-label="Open image gallery"
										onClick={() => {
											openModal(
												'imagesGallery',
												{
													images,
													settings: {
														arrows: false,
														dots: true,
														initialSlide: index,
													},
												},
												{ customModal: true },
											);
										}}
									/>
								</IconRow>
							))}
						</UploadedImages>
					</>
				) : (
					<p>Nenhuma foto cadastrada</p>
				)}
			</Section>

			<Section title="Vídeos" hideWhenIsEmpty={false}>
				<UploadsTitle>Vídeos da Tecnologia</UploadsTitle>
				{technology.videos?.length ? (
					<Videos data={technology.videos} />
				) : (
					<p>Nenhum vídeo cadastrado</p>
				)}
			</Section>

			<Section title="Documentos" hideWhenIsEmpty={false}>
				<UploadsTitle>Documentos</UploadsTitle>
				{technology.attachments.documents?.length ? (
					<UploadedDocuments>
						{technology.attachments.documents.map((element) => (
							<IconRow row key={element.url}>
								<IconLink href={element.url}>
									<FaFilePdf size="2rem" /> {element.filename}
								</IconLink>
							</IconRow>
						))}
					</UploadedDocuments>
				) : (
					<p>Nenhum documento cadastrado</p>
				)}
			</Section>
		</Layout.Cell>
	);
};

const UploadsTitle = styled.span`
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

const UploadedDocuments = styled(MapAndAttachments.UploadedDocuments)``;

const UploadedImages = styled(MapAndAttachments.UploadedImages)`
	grid-template-columns: repeat(auto-fill, 20%);
`;

const IconRow = styled(MapAndAttachments.IconRow)``;

const Media = styled(MapAndAttachments.Media)`
	cursor: pointer;
	filter: opacity(1);
`;

const IconLink = styled(MapAndAttachments.IconLink)``;

export default Attachments;
