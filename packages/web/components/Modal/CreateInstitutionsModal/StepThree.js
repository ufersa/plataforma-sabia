/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { InputHiddenField } from '../../Form';
import { Cell, Row } from '../../Common';
import { InputLabel } from '../../Form/styles';
import { upload } from '../../../services/uploads';

import * as S from './styles';

const StepThree = ({ form }) => {
	const [logoPreview, setLogoPreview] = useState(null);
	const [uploadError, setUploadError] = useState(null);
	const logoRef = useRef(null);
	const { setValue } = form;

	// eslint-disable-next-line consistent-return
	const onDropAttachment = async (acceptedFiles) => {
		if (!acceptedFiles) return null;

		const formData = new FormData();
		if (acceptedFiles.length !== 0) {
			formData.append(`files[0]`, acceptedFiles[0], acceptedFiles[0].name);
		}

		const response = await upload(formData);

		if (response.status === 200) {
			const { id, url } = response.data[0];
			setLogoPreview(url);
			setValue('logo_id', id);
		} else {
			setUploadError(response.data.error.message[0].message);
		}
	};

	return (
		<>
			<Row>
				<Cell col={12}>
					<S.DropzoneWrapper>
						<InputLabel>Logo</InputLabel>
						<Dropzone
							accept="image/*"
							onDrop={(acceptedFiles) => onDropAttachment(acceptedFiles)}
							ref={logoRef}
							multiple={false}
						>
							{({ getRootProps, getInputProps }) => (
								<S.LogoDropzone {...getRootProps()}>
									<input name="logo" {...getInputProps()} />
									{logoPreview && (
										<S.LogoPreview url={logoPreview} alt="Prévia da logo" />
									)}
									<S.PreviewHelp>
										Clique ou arraste a logo da organização aqui.
									</S.PreviewHelp>
									{uploadError && <S.UploadError>{uploadError}</S.UploadError>}
								</S.LogoDropzone>
							)}
						</Dropzone>
					</S.DropzoneWrapper>
				</Cell>
			</Row>
			<InputHiddenField form={form} name="logo_id" />
		</>
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
