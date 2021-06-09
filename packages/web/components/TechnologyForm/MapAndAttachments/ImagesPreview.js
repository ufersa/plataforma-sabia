import React, { useEffect } from 'react';
import { FiTrash2, FiImage } from 'react-icons/fi';

import { IconRow, Media, Button, RadioWrapper } from './styles';

const ImagesPreview = ({ previewedImgFiles, value, onChange, deleteAttachment }) => {
	useEffect(() => {
		// This will set first image as thumbnail if there's no thumbnail previously set
		// Or in case the current thumbnail is deleted
		const valueHasInPreview = previewedImgFiles?.some((item) => item.id === value);
		if ((!value || !valueHasInPreview) && !!previewedImgFiles.length) {
			onChange(previewedImgFiles[0].id);
			return;
		}

		// This will clear thumbnail value if theres no preview
		// It means that all images has been deleted
		if (!previewedImgFiles.length) {
			onChange('');
		}
	}, [value, onChange, previewedImgFiles]);

	const handleDelete = ({ index, element }) => {
		deleteAttachment({
			index,
			element,
			type: 'img',
		});
	};

	if (!previewedImgFiles?.length) {
		return null;
	}

	return previewedImgFiles.map((element, index) => (
		<IconRow key={element.url} alignItems="flex-start">
			<RadioWrapper>
				<input
					id={element.url}
					type="radio"
					name="thumbnail_id"
					value={element.id}
					checked={value === element.id}
					onChange={() => onChange(element.id)}
				/>
				{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
				<label htmlFor={element.url}>
					<FiImage fontSize="1.6rem" />
					Usar como capa
				</label>
			</RadioWrapper>
			<Button onClick={() => handleDelete({ index, element })}>
				<FiTrash2 fontSize="1.6rem" />
				Excluir
			</Button>
			<Media key={element.url} src={element.url} />
		</IconRow>
	));
};

export default ImagesPreview;
