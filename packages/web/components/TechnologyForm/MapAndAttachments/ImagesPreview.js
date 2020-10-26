import React from 'react';
import { FiTrash2, FiImage } from 'react-icons/fi';

import { IconRow, Media, Button, RadioWrapper } from './styles';

const ImagesPreview = ({ previewedImgFiles, value, onChange, deleteAttachment }) => {
	return (
		previewedImgFiles?.map((element, index) => (
			<IconRow key={element.url} alignItems="flex-start">
				<RadioWrapper>
					<input
						id={element.url}
						type="radio"
						name="thumbnail_id"
						value={element.id}
						defaultChecked={value === element.id || !index}
						onChange={onChange}
					/>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label htmlFor={element.url}>
						<FiImage fontSize="1.6rem" />
						Usar como capa
					</label>
				</RadioWrapper>
				<Button
					onClick={() =>
						deleteAttachment({
							index,
							element,
							type: 'img',
						})
					}
				>
					<FiTrash2 fontSize="1.6rem" />
					Excluir
				</Button>
				<Media key={element.url} src={element.url} />
			</IconRow>
		)) || null
	);
};

export default ImagesPreview;
