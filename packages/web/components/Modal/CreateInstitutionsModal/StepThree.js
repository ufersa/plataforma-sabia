/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Cell, Row } from '../../Common';
import { InputLabel } from '../../Form/styles';

import * as S from './styles';

const StepThree = ({ form }) => {
	const [logo, setLogo] = useState(null);
	const logoRef = useRef(null);

	// eslint-disable-next-line consistent-return
	const onDropAttachment = async (acceptedFiles, type) => {
		console.log(acceptedFiles, type);

		if (!acceptedFiles) return null;

		const formattedFile = Object.assign(acceptedFiles[0], {
			preview: URL.createObjectURL(acceptedFiles[0]),
		});

		setLogo(formattedFile.preview);

		console.log(formattedFile);

		// const formData = new FormData();
		// for (let index = 0; index < acceptedFiles.length; index += 1) {
		// 	formData.append(`files[${index}]`, acceptedFiles[index], acceptedFiles[index].name);
		// }

		// formData.append(
		// 	'meta',
		// 	JSON.stringify({
		// 		object: 'technologies',
		// 		object_id: form.getValues('id'),
		// 	}),
		// );

		// const response = await upload(formData);

		// if (response.status === 200) {
		// 	if (type === 'img') {
		// 		const newValue = [...previewedImgFiles, ...response.data];
		// 		setPreviewedImgFiles(newValue);
		// 	}

		// 	if (type === 'pdf') {
		// 		const newValue = [...previewedPdfFiles, ...response.data];
		// 		setPreviewedPdfFiles(newValue);
		// 	}
		// } else {
		// 	setUploadError(response.data.error.message[0].message);
		// }
	};

	return (
		<Row>
			<Cell col={12}>
				<S.DropzoneWrapper>
					<InputLabel>Logo</InputLabel>
					<Dropzone
						accept="image/*"
						onDrop={(acceptedFiles) => onDropAttachment(acceptedFiles, 'img')}
						ref={logoRef}
						multiple={false}
					>
						{({ getRootProps, getInputProps }) => (
							<S.LogoDropzone {...getRootProps()}>
								<input name="logo" {...getInputProps()} />
								{logo && <S.LogoPreview src={logo} alt="Prévia da logo" />}
								<S.PreviewHelp>
									Clique ou arraste a logo da organização aqui.
								</S.PreviewHelp>
							</S.LogoDropzone>
						)}
					</Dropzone>
				</S.DropzoneWrapper>
			</Cell>
		</Row>
	);
};

StepThree.propTypes = {
	form: PropTypes.shape({
		watch: PropTypes.func,
		getValues: PropTypes.func,
		setValue: PropTypes.func,
	}),
};

StepThree.defaultProps = {
	form: {},
};

export default StepThree;
