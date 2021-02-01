import React from 'react';

import { FaFilePdf } from 'react-icons/fa';
import Videos from '../../Technology/Details/Videos';
import Geolocation from '../../Technology/Details/Tabs/GeoLocation';
import { useTechnology, useModal } from '../../../hooks';
import { Container, ContentBox } from '../styles';
import * as S from './styles';

const MapAndAttachments = () => {
	const { technology } = useTechnology();
	const { openModal } = useModal();

	return (
		<Container>
			<ContentBox flexBasis="100%">
				<Geolocation />

				<S.UploadsTitle>Fotos da Tecnologia</S.UploadsTitle>
				{technology.attachments?.images?.length ? (
					<S.UploadedImages>
						{technology.attachments?.images.map((element, index) => (
							<S.IconRow key={element.url}>
								<S.Media
									src={element.url}
									role="button"
									aria-label="Open image gallery"
									onClick={() => {
										openModal(
											'imagesGallery',
											{
												technology,
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
								{element.id === technology.thumbnail_id && (
									<S.ImageCaption>Imagem de capa</S.ImageCaption>
								)}
							</S.IconRow>
						))}
					</S.UploadedImages>
				) : (
					<p>Nenhuma foto cadastrada</p>
				)}

				<S.UploadsTitle>Vídeos da Tecnologia</S.UploadsTitle>
				{technology.videos?.length ? (
					<Videos data={technology.videos} />
				) : (
					<p>Nenhum vídeo cadastrado</p>
				)}

				<S.UploadsTitle>Documentos</S.UploadsTitle>
				{technology.attachments.documents?.length ? (
					<S.UploadedDocuments>
						{technology.attachments.documents.map((element) => (
							<S.IconRow row key={element.url}>
								<S.IconLink href={element.url}>
									<FaFilePdf size="2rem" /> {element.filename}
								</S.IconLink>
							</S.IconRow>
						))}
					</S.UploadedDocuments>
				) : (
					<p>Nenhum documento cadastrado</p>
				)}
			</ContentBox>
		</Container>
	);
};

export default MapAndAttachments;
