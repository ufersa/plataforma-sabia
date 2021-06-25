/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTrash, FaFileUpload, FaFilePdf, FaMapMarkerAlt } from 'react-icons/fa';
import Dropzone from 'react-dropzone';
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete';
import { Controller } from 'react-hook-form';
import { upload, deleteUpload } from '../../../services/uploads';
import { createLocation } from '../../../services';
import { InputField, SelectField, InputHiddenField, HelpModal } from '../../Form';
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
	InputVideoWrapper,
	ButtonVideoAdd,
	VideoContainer,
	VideosWrapper,
	VideoItem,
	RemoveVideoButton,
	EmptyVideos,
} from './styles';
import { Row, Column } from '../../Common/Layout';
import { CircularButton } from '../../Button';
import { getYoutubeVideoId } from '../../../utils/helper';
import { LOCATIONS as technologyLocationsEnum } from '../../../utils/enums/technology.enums';
import ImagesPreview from './ImagesPreview';
import { toast } from '../../Toast';

const parseLocationsFromApi = (findLocationType, locations) => {
	const filteredLocations = locations.filter(
		(location) => location.pivot?.location_type === findLocationType,
	);

	return filteredLocations.map((location) => ({ ...location, description: location.address }));
};

const MapAndAttachments = ({ form, data }) => {
	const { attachments } = data.technology;
	const imgsRef = useRef(null);
	const pdfRef = useRef(null);
	const [whereIsAlreadyImplemented, setWhereIsAlreadyImplemented] = useState([]);
	const [whereIsAlreadyImplementedInput, setWhereIsAlreadyImplementedInput] = useState('');
	const [whoDevelop, setWhoDevelop] = useState([]);
	const [whoDevelopInput, setWhoDevelopInput] = useState('');
	const [previewedImgFiles, setPreviewedImgFiles] = useState(attachments.images);
	const [previewedPdfFiles, setPreviewedPdfFiles] = useState(attachments.documents);
	const [uploadError, setUploadError] = useState(false);
	const [videos, setVideos] = useState(data.technology.videos || []);
	const { control } = form;

	useEffect(() => {
		const whereIsAlreadyImplementedParsed = parseLocationsFromApi(
			technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED,
			data.technology?.locations,
		);
		setWhereIsAlreadyImplemented(whereIsAlreadyImplementedParsed);

		const whoDevelopParsed = parseLocationsFromApi(
			technologyLocationsEnum.WHO_DEVELOP,
			data.technology?.locations,
		);
		setWhoDevelop(whoDevelopParsed);
	}, []);

	useEffect(() => {
		whoDevelop.forEach((element, index) => {
			form.setValue(`locations.who_develop[${index}]`, element.id);
		});
	}, [whoDevelop]);

	useEffect(() => {
		whereIsAlreadyImplemented.forEach((element, index) => {
			form.setValue(`locations.where_is_already_implemented[${index}]`, element.id);
		});
	}, [whereIsAlreadyImplemented]);

	useEffect(() => {
		form.setValue('videos', JSON.stringify(videos));
	}, [videos]);

	const onAddVideos = (link) => {
		if (!link || link === '') {
			form.setError('link_video', 'manual', 'Formato de URL inválido');
			return;
		}

		const videoId = getYoutubeVideoId(link);

		if (videoId) {
			form.clearError('link_video');
			const alreadyExists = videos.some((video) => video?.videoId === videoId);

			if (!alreadyExists) {
				setVideos((prevState) => [
					{
						thumbnail: `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`,
						link,
						videoId,
						provider: 'Youtube',
					},
					...prevState,
				]);
				form.setValue('link_video', '');
			} else {
				form.setError('link_video', 'manual', 'O vídeo já foi adicionado');
			}
		} else {
			form.setError('link_video', 'manual', 'Formato de URL inválido');
		}
	};

	const onRemoveVideos = (index) => setVideos(videos.filter((video, idx) => idx !== index));

	// eslint-disable-next-line consistent-return
	const onDropAttachments = async (acceptedFiles, type) => {
		if (!acceptedFiles) return null;

		const formData = new FormData();
		for (let index = 0; index < acceptedFiles.length; index += 1) {
			formData.append(`files[${index}]`, acceptedFiles[index], acceptedFiles[index].name);
		}

		formData.append(
			'meta',
			JSON.stringify({
				object: 'technologies',
				object_id: form.getValues('id'),
			}),
		);

		try {
			const response = await upload(formData);
			if (response.status === 200) {
				if (type === 'img') {
					const newValue = [...previewedImgFiles, ...response.data];
					setPreviewedImgFiles(newValue);
				}

				if (type === 'pdf') {
					const newValue = [...previewedPdfFiles, ...response.data];
					setPreviewedPdfFiles(newValue);
				}
			} else {
				setUploadError(response.data.error.message[0].message);
			}
		} catch (error) {
			setUploadError(
				'Ocorreu um error ao fazer o upload, verifique se você seguiu as instruções corretamente, checando o tipo de arquivo e o tamanho dele',
			);
		}
	};

	const deleteAttachment = async ({ index, element, type }) => {
		await deleteUpload(element.id);
		if (type === 'img') {
			setPreviewedImgFiles(
				previewedImgFiles.filter((media, innerIndex) => index !== innerIndex),
			);
		}
		if (type === 'pdf') {
			setPreviewedPdfFiles(
				previewedPdfFiles.filter((pdf, innerIndex) => index !== innerIndex),
			);
		}
	};

	const deleteFromCollection = async (index, collection) => {
		if (collection === 'whoDevelop') {
			setWhoDevelop((prevState) => prevState.filter((_, innerIndex) => index !== innerIndex));
			return;
		}

		if (collection === 'whereIsAlreadyImplemented') {
			setWhereIsAlreadyImplemented((prevState) =>
				prevState.filter((_, innerIndex) => index !== innerIndex),
			);
		}
	};

	const onSelect = async ({ properties, locationType }) => {
		const state =
			locationType === technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED
				? whereIsAlreadyImplemented
				: whoDevelop;
		const toBePushed = properties;
		if (state.some((element) => element.placeId === toBePushed.placeId)) {
			return;
		}
		const response = await geocodeByPlaceId(toBePushed.placeId);
		if (response) {
			toBePushed.location = {
				lat: response[0].geometry.location.lat(),
				lng: response[0].geometry.location.lng(),
			};
		}

		const createResponse = await createLocation({
			place_id: toBePushed.placeId,
			address: toBePushed.description,
			lat: toBePushed.location?.lat?.toString(),
			lng: toBePushed.location?.lng?.toString(),
		});

		if (createResponse.error) {
			toast.error(
				createResponse.messages?.[0]?.message ||
					'Ocorreu um erro para salvar sua localização, tente novamente em instantes.',
			);
			return;
		}

		const newState = [
			...state,
			{ ...toBePushed, locationType, id: createResponse.location.id },
		];
		if (locationType === technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED) {
			setWhereIsAlreadyImplemented(newState);
			setWhereIsAlreadyImplementedInput('');
		} else {
			setWhoDevelop(newState);
			setWhoDevelopInput('');
		}
	};

	return (
		<Wrapper>
			<HelpModal show={!!uploadError} onHide={() => setUploadError(false)}>
				{uploadError}
			</HelpModal>
			<Row>
				<Column>
					<Row>
						<Column>
							<Title>Onde a Tecnologia é desenvolvida?</Title>
						</Column>
					</Row>
					<Row>
						<Column>
							<PlacesAutocomplete
								id="who_develop"
								name="who_develop"
								value={whoDevelopInput}
								onChange={(value) => setWhoDevelopInput(value)}
								onSelect={(_, __, properties) =>
									onSelect({
										properties,
										locationType: technologyLocationsEnum.WHO_DEVELOP,
									})
								}
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
												placeholder: 'Procurar instituições e empresas...',
												className: 'location-search-input',
											})}
											form={{ register: () => {} }}
										/>
										<div className="autocomplete-dropdown-container">
											{loading && (
												<GoogleAddressSugestions>
													Carregando...
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
															key={suggestion.placeId}
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
							{whoDevelop.map((element, index) => {
								return (
									<IconRow row>
										<IconLink>
											<FaMapMarkerAlt size="2rem" /> {element.description}
										</IconLink>
										<CircularButton
											variant="remove"
											height="2"
											width="2"
											onClick={() =>
												deleteFromCollection(index, 'whoDevelop')
											}
										>
											<FaTrash size="1em" />
										</CircularButton>
										<InputHiddenField
											form={form}
											type="hidden"
											ref={form.register()}
											name={`locations.who_develop[${index}]`}
										/>
									</IconRow>
								);
							})}
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
								id="where_can_be_applied"
								label="Região"
								name="terms.where_can_be_applied"
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
								id="where_is_already_implemented"
								name="where_is_already_implemented"
								value={whereIsAlreadyImplementedInput}
								onChange={(value) => setWhereIsAlreadyImplementedInput(value)}
								onSelect={(_, __, properties) =>
									onSelect({
										properties,
										locationType:
											technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED,
									})
								}
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
													Carregando...
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
															key={suggestion.placeId}
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
							{whereIsAlreadyImplemented.map((element, index) => {
								return (
									<IconRow row>
										<IconLink>
											<FaMapMarkerAlt size="2rem" /> {element.description}
										</IconLink>
										<CircularButton
											variant="remove"
											height="2"
											width="2"
											onClick={() =>
												deleteFromCollection(
													index,
													'whereIsAlreadyImplemented',
												)
											}
										>
											<FaTrash size="1em" />
										</CircularButton>
										<InputHiddenField
											form={form}
											type="hidden"
											ref={form.register()}
											name={`locations.where_is_already_implemented[${index}]`}
										/>
									</IconRow>
								);
							})}
						</Column>
					</Row>
				</Column>
				<Column>
					<Title>Fotos da tecnologia</Title>
					<Dropzone
						accept="image/*"
						onDrop={(acceptedFiles) => onDropAttachments(acceptedFiles, 'img')}
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
					<UploadedImages data-cy="uploaded-images">
						<Controller
							as={ImagesPreview}
							name="thumbnail_id"
							control={control}
							previewedImgFiles={previewedImgFiles}
							deleteAttachment={deleteAttachment}
						/>
					</UploadedImages>

					<Title>Videos da tecnologia</Title>
					<VideoContainer>
						<InputVideoWrapper>
							<InputField
								form={form}
								type="url"
								name="link_video"
								placeholder="Link do Youtube"
							/>
							<InputHiddenField form={form} type="hidden" name="videos" />
							<ButtonVideoAdd
								type="button"
								variant="secondary"
								onClick={() => onAddVideos(form.getValues('link_video'))}
							>
								Adicionar
							</ButtonVideoAdd>
						</InputVideoWrapper>
						{videos?.length ? (
							<VideosWrapper>
								{videos.map((video, idx) => (
									<VideoItem key={`video_${video.videoId}`}>
										<a
											href={`//www.youtube.com/watch?v=${video.videoId}`}
											target="_blank"
											rel="noreferrer"
										>
											<img
												src={video.thumbnail}
												alt={`Youtube vídeo ${video.videoId}`}
											/>
										</a>
										<RemoveVideoButton
											type="button"
											onClick={() => onRemoveVideos(idx)}
										>
											Remover
										</RemoveVideoButton>
									</VideoItem>
								))}
							</VideosWrapper>
						) : (
							<EmptyVideos>
								<p>Nenhum vídeo adicionado</p>
							</EmptyVideos>
						)}
					</VideoContainer>

					<Title>Documentos</Title>
					<Dropzone
						accept=".pdf"
						onDrop={(acceptedFiles) => onDropAttachments(acceptedFiles, 'pdf')}
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
						{previewedPdfFiles?.map((element, index) => {
							return (
								<IconRow row>
									<IconLink href={element.url}>
										<FaFilePdf size="2rem" /> {element.filename}
									</IconLink>
									<CircularButton
										variant="remove"
										height="2"
										width="2"
										onClick={() =>
											deleteAttachment({
												index,
												element,
												type: 'pdf',
											})
										}
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
		register: PropTypes.func,
		setValue: PropTypes.func,
		setError: PropTypes.func,
		clearError: PropTypes.func,
		control: PropTypes.shape({}),
	}),
	data: PropTypes.shape({
		technology: PropTypes.shape({
			attachments: PropTypes.shape({
				images: PropTypes.arrayOf(PropTypes.shape({})),
				documents: PropTypes.arrayOf(PropTypes.shape({})),
			}),
			locations: PropTypes.arrayOf(PropTypes.shape({})),
			videos: PropTypes.arrayOf(PropTypes.shape({})),
		}),
	}),
};

MapAndAttachments.defaultProps = {
	form: {},
	data: {
		technology: {
			attachments: {
				images: [],
				documents: [],
			},
			locations: [],
			videos: [],
		},
	},
};

export default MapAndAttachments;
