import React from 'react';

import { FaFilePdf } from 'react-icons/fa';
import { useTechnology } from '../../../../hooks';
import { Container } from '../styles';
import {
	IconLink,
	IconRow,
	Media,
	UploadedDocuments,
	UploadedImages,
	UploadsTitle,
} from '../../../TechnologyForm/Review/styles';

const Documents = () => {
	const { technology } = useTechnology();

	return (
		<Container flexDirection="column">
			<UploadsTitle>Fotos da Tecnologia</UploadsTitle>
			{technology.attachments.images?.length ? (
				<UploadedImages>
					{technology.attachments.images?.map((element) => (
						<IconRow key={element.url}>
							<Media src={element.url} />
						</IconRow>
					))}
				</UploadedImages>
			) : (
				<p>Nenhuma foto cadastrada</p>
			)}
			<UploadsTitle>Documentos</UploadsTitle>
			{technology.attachments.documents?.length ? (
				<UploadedDocuments>
					{technology.attachments.documents?.map((element) => (
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
		</Container>
	);
};

export default Documents;
