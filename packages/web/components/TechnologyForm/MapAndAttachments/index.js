/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaMinus, FaPlus, FaTrash, FaFileUpload, FaFilePdf, FaMapMarkerAlt } from 'react-icons/fa';
import Dropzone from 'react-dropzone';
import CreatableSelect from 'react-select/creatable';
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete';
import { upload, deleteUpload } from '../../../services/uploads';
import { InputField, SelectField } from '../../Form';
import {
	UploadedImages,
	UploadedDocuments,
	SvgBox,
	IconBox,
	IconTextBox,
	UploadBox,
	Suggestion,
	GoogleAddressSugestions,
	Div,
	IconLink,
	Wrapper,
	IconRow,
	Title,
	Media,
} from './styles';
import { Row, Column } from '../../Common/Layout';
import { CircularButton } from '../../Button';
import Repeater from '../../Form/Repeater';

const MapAndAttachments = ({ form }) => {
	const imgsRef = useRef(null);
	const pdfRef = useRef(null);
	const [addressInput, setAddressInput] = useState([]);
	const [address, setAddress] = useState([]);
	const [previewedImgFiles, setPreviewedImgFiles] = useState(
		form.getValues('attachments').filter((file) => file.url.indexOf('.pdf') === -1),
	);
	const [previewedPdfFiles, setPreviewedPdfFiles] = useState(
		form.getValues('attachments').filter((file) => file.url.indexOf('.pdf') !== -1),
	);
	// eslint-disable-next-line consistent-return
	const onDropImgs = async (acceptedFiles) => {
		if (!acceptedFiles) return null;

		const data = new FormData();
		for (let index = 0; index < acceptedFiles.length; index += 1) {
			data.append(`files[${index}]`, acceptedFiles[index], acceptedFiles[index].name);
		}

		data.append(
			'meta',
			JSON.stringify({
				object: 'technologies',
				object_id: form.getValues('id'),
			}),
		);

		const response = await upload(data);
		const newValue = [...previewedImgFiles, ...response];
		setPreviewedImgFiles(newValue);
	};

	// eslint-disable-next-line consistent-return
	const onDropPdfs = async (acceptedFiles) => {
		if (!acceptedFiles) return null;

		const data = new FormData();
		for (let index = 0; index < acceptedFiles.length; index += 1) {
			data.append(`files[${index}]`, acceptedFiles[index], acceptedFiles[index].name);
		}

		data.append('meta', {
			object: 'technologies',
			object_id: form.getValues('id'),
		});

		const response = await upload(data);
		const newValue = [...previewedPdfFiles, ...response];
		setPreviewedPdfFiles(newValue);
	};

	const deleteAttachment = async ({ index, element }) => {
		await deleteUpload(element.id);
		setPreviewedPdfFiles(previewedPdfFiles.filter((pdf, innerIndex) => index !== innerIndex));
	};

	const deleteMedia = async ({ index, element }) => {
		await deleteUpload(element.id);
		setPreviewedImgFiles(previewedImgFiles.filter((media, innerIndex) => index !== innerIndex));
	};

	const deleteAlreadyImpletedMarker = (index) => {
		setAddress(address.filter((element, innerIndex) => index !== innerIndex));
	};

	return (
		<Wrapper>
			<Row>
				<Column>
					<Row>
						<Column>
							<Title>Onde a Tecnologia é desenvolvida?</Title>
						</Column>
					</Row>
					<Row>
						<Column>
							<Repeater
								form={form}
								name="who_develop"
								childsComponent={({ remove, fields, index }) => {
									return (
										<Row align="center" justify="center">
											<Column noPadding>
												<CreatableSelect
													form={form}
													name={`who_develop[${index}]`}
													placeholder="Nome da instituição que desenvolve a tecnologia"
													validation={{ required: true }}
													options={[
														{
															value: 'INSA',
															label:
																'INSTITUTO NACIONAL DO SEMIÁRIDO',
														},
													]}
												/>
											</Column>
											<Column autoX>
												<CircularButton
													disabled={index === 0 && fields.length === 1}
													size="small"
													variant="remove"
													shortPadding
													name={`who_develop[${index}]_remove_button`}
													onClick={(event) => {
														event.preventDefault();
														remove(index);
													}}
												>
													<FaMinus />
												</CircularButton>
											</Column>
										</Row>
									);
								}}
								// eslint-disable-next-line no-shadow
								endComponent={({ append, emptyValue }) => {
									return (
										<Row>
											<Column>
												<CircularButton
													right
													variant="info"
													color="white"
													name="who_develop_add_button"
													onClick={(event) => {
														event.preventDefault();
														append(emptyValue);
													}}
												>
													<FaPlus />
												</CircularButton>
											</Column>
										</Row>
									);
								}}
							/>
						</Column>
					</Row>
					<Row>
						<Column>
							<Title>Onde a Tecnologia pode ser aplicada?</Title>
						</Column>
					</Row>
					<Row>
						<Column>
							<SelectField
								form={form}
								label="Região"
								name="where_can_be_applied"
								placeholder="Escolha uma região"
								validation={{ required: true }}
								options={[
									{
										value: 'semiarido',
										label: 'Semiárido',
									},
								]}
							/>
						</Column>
					</Row>

					<Row>
						<Column>
							<Title>Onde a Tecnologia já está implantada?</Title>
						</Column>
					</Row>
					<Row>
						<Column>
							<PlacesAutocomplete
								value={addressInput}
								onChange={(value) => setAddressInput(value)}
								onSelect={async (value, options, properties) => {
									const toBePushed = properties;
									const response = await geocodeByPlaceId(toBePushed.placeId);
									if (response) {
										toBePushed.location = {
											lat: response[0].geometry.location.lat(),
											lng: response[0].geometry.location.lng(),
										};
									}
									setAddress([...address, toBePushed]);
								}}
							>
								{({
									getInputProps,
									suggestions,
									getSuggestionItemProps,
									loading,
								}) => (
									<div>
										<InputField
											{...getInputProps({
												placeholder: 'Procurar localidades...',
												className: 'location-search-input',
											})}
											form={{ register: () => {} }}
										/>
										<div className="autocomplete-dropdown-container">
											{loading && (
												<GoogleAddressSugestions>
													Loading...
												</GoogleAddressSugestions>
											)}
											<GoogleAddressSugestions>
												{suggestions.map((suggestion) => {
													const style = suggestion.active
														? {
																backgroundColor: '#fafafa',
														  }
														: {
																backgroundColor: '#fff',
														  };
													return (
														<div
															{...getSuggestionItemProps(suggestion, {
																style,
															})}
														>
															<Suggestion>
																{suggestion.description}
															</Suggestion>
														</div>
													);
												})}
											</GoogleAddressSugestions>
										</div>
									</div>
								)}
							</PlacesAutocomplete>
						</Column>
					</Row>
					<Row>
						<Column>
							{address.map((element, index) => {
								return (
									<IconRow row>
										<IconLink>
											<FaMapMarkerAlt size="2rem" /> {element.description}
										</IconLink>
										<CircularButton
											variant="remove"
											height="2"
											width="2"
											onClick={() => deleteAlreadyImpletedMarker(index)}
										>
											<FaTrash size="1em" />
										</CircularButton>
									</IconRow>
								);
							})}
						</Column>
					</Row>
				</Column>
				<Column>
					<Title>Fotos e Vídeos da tecnologia</Title>

					<Dropzone
						accept="image/*"
						onDrop={(acceptedFiles) => onDropImgs(acceptedFiles)}
						ref={imgsRef}
					>
						{({ getRootProps, getInputProps }) => (
							<UploadBox {...getRootProps()}>
								<input {...getInputProps()} />
								<SvgBox>
									<IconBox>
										<FaFileUpload size="5rem" />
										<IconTextBox>
											<Div>Upload</Div>
											<Div>1280px x 720px</Div>
										</IconTextBox>
									</IconBox>
								</SvgBox>
							</UploadBox>
						)}
					</Dropzone>
					<UploadedImages>
						{previewedImgFiles.map((element, index) => {
							return (
								<IconRow>
									<Media key={element.src} src={element.url} />
									<CircularButton
										variant="remove"
										height="3"
										width="3"
										onClick={() => deleteMedia({ index, element })}
									>
										<FaTrash size="1.5em" />
									</CircularButton>
								</IconRow>
							);
						})}
					</UploadedImages>

					<Title>Documentos</Title>
					<Dropzone
						accept=".pdf"
						onDrop={(acceptedFiles) => onDropPdfs(acceptedFiles)}
						ref={pdfRef}
					>
						{({ getRootProps, getInputProps }) => (
							<UploadBox {...getRootProps()}>
								<input {...getInputProps()} />
								<SvgBox>
									<IconBox>
										<FaFileUpload size="5rem" />
										<IconTextBox>
											<Div>Upload</Div>
											<Div>.PDF</Div>
										</IconTextBox>
									</IconBox>
								</SvgBox>
							</UploadBox>
						)}
					</Dropzone>
					<UploadedDocuments>
						{previewedPdfFiles.map((element, index) => {
							return (
								<IconRow row>
									<IconLink>
										<FaFilePdf size="2rem" />{' '}
										<a href={element.url}>{element.name}</a>
									</IconLink>
									<CircularButton
										variant="remove"
										height="2"
										width="2"
										onClick={() => deleteAttachment({ index, element })}
									>
										<FaTrash size="1em" />
									</CircularButton>
								</IconRow>
							);
						})}
					</UploadedDocuments>
				</Column>
			</Row>
		</Wrapper>
	);
};

MapAndAttachments.propTypes = {
	form: PropTypes.shape({
		getValues: PropTypes.func,
	}),
};

MapAndAttachments.defaultProps = {
	form: {},
};

export default MapAndAttachments;
