import React from 'react';
import { FaTrash } from 'react-icons/fa';

import { CircularButton } from '../../Button';
import { IconRow, Media } from './styles';

const ImagesPreview = ({ previewedImgFiles, value, onChange, deleteAttachment }) => {
	return (
		previewedImgFiles?.map((element, index) => (
			<IconRow key={element.url} alignItems="flex-start">
				<label htmlFor={element.url}>
					<input
						id={element.url}
						type="radio"
						name="thumbnail_id"
						value={element.id}
						defaultChecked={value === element.id}
						onChange={onChange}
						style={{ marginRight: '1rem' }}
					/>
					Foto de capa
				</label>
				<CircularButton
					variant="remove"
					height="3"
					width="3"
					onClick={() =>
						deleteAttachment({
							index,
							element,
							type: 'img',
						})
					}
				>
					<FaTrash size="1.5em" />
				</CircularButton>
				<Media key={element.url} src={element.url} />
			</IconRow>
		)) || null
	);
};

export default ImagesPreview;
