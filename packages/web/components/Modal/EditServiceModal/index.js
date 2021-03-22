/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { FiUpload, FiTrash2 } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import {
	CurrencyInputField,
	InputField,
	InputHiddenField,
	SelectField,
	TextField,
} from '../../Form';
import { RectangularButton } from '../../Button';
import { toast } from '../../Toast';
import * as S from './styles';
import { Column, Row, Title } from '../../Common';
import { measureUnitOptions, typeOptions } from '../../../utils/service';
import { deleteUpload, upload } from '../../../services/uploads';
import { createTerm, updateService } from '../../../services';
import { formatCurrencyToInt, mapArrayOfObjectToSelect } from '../../../utils/helper';

const EditServiceModal = ({
	closeModal,
	id,
	name,
	thumbnail,
	keywords,
	description,
	measure_unit,
	price,
	type,
	revalidateServices,
	revalidateKeywords,
	keywordsOptions,
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [uploadError, setUploadError] = useState(null);

	const form = useForm({
		defaultValues: {
			name,
			keywords,
			thumbnail: { id: thumbnail?.id, url: thumbnail?.url },
			description,
			measure_unit,
			price,
			type,
		},
	});
	const formThumbnail = form.watch('thumbnail');

	const onSubmit = async (values) => {
		setIsSubmitting(true);

		const serviceToEdit = {
			...values,
			measure_unit: values.measure_unit.value,
			thumbnail_id: values.thumbnail.id,
			type: values.type.value,
			keywords: values.keywords?.map((item) => item.value) ?? [],
			price: formatCurrencyToInt(values.price),
		};

		const result = await updateService(id, serviceToEdit);

		if (result.success) {
			toast.success('Serviço atualizado com sucesso');
			revalidateServices();
			revalidateKeywords();
			closeModal();
		} else {
			toast.error(result.error);
		}

		setIsSubmitting(false);
	};

	const onDropAttachment = async (acceptedFiles) => {
		if (!acceptedFiles) return null;

		setUploadError(false);

		const formData = new FormData();
		if (acceptedFiles.length !== 0) {
			formData.append(`files[0]`, acceptedFiles[0], acceptedFiles[0].name);
		}

		const response = await upload(formData);

		if (response.status === 200) {
			const { id: uploadId, url } = response.data[0];
			form.setValue('thumbnail.id', uploadId);
			form.setValue('thumbnail.url', url);
		} else {
			setUploadError(response.data?.error?.message[0]?.message);
		}

		return true;
	};

	const handleRemoveAttachment = async () => {
		const response = await deleteUpload(formThumbnail.id);

		if (response?.success) {
			form.setValue('thumbnail.id', '');
			form.setValue('thumbnail.url', '');
		} else {
			toast.error(response.data?.error?.message[0]?.message);
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop: onDropAttachment,
	});

	const onCreateTerm = async (inputValue) => {
		const term = await createTerm(inputValue, 'KEYWORDS');
		revalidateKeywords();
		return { label: term.term, value: `${term.id}` };
	};

	return (
		<S.Modal onSubmit={form.handleSubmit(onSubmit)} noValidate>
			<Title>Editar serviço</Title>

			<Row>
				<S.Column noPadding mr={1.2} noMarginMobile>
					<InputField
						form={form}
						name="name"
						label="Nome do serviço"
						variant="gray"
						fullWidth
					/>

					<SelectField
						form={form}
						name="keywords"
						placeholder="Busque por palavras chaves (pode adicionar mais de um)"
						label="Palavras-chave"
						isMulti
						creatable
						onCreate={(inputValue) => onCreateTerm(inputValue)}
						options={mapArrayOfObjectToSelect(keywordsOptions, 'term', 'id')}
						variant="gray"
					/>

					<TextField
						form={form}
						name="description"
						label="Descrição do serviço"
						resize="none"
						variant="gray"
					/>
				</S.Column>
				<Column noPadding ml={1.2} noMarginMobile>
					<S.Row mb={1.6}>
						<InputHiddenField form={form} name="thumbnail.id" />
						<InputHiddenField form={form} name="thumbnail.url" />
						<S.ImageContainer>
							<Image
								src={formThumbnail?.url || '/card-image.jpg'}
								alt={name}
								layout="fill"
								objectFit="cover"
							/>
						</S.ImageContainer>
						<S.ImageActions>
							<S.UploadBox {...getRootProps()}>
								<input {...getInputProps()} />
								<RectangularButton colorVariant="green">
									<FiUpload fontSize={14} strokeWidth={4} />
									Alterar imagem
								</RectangularButton>
							</S.UploadBox>

							<RectangularButton
								colorVariant="red"
								onClick={handleRemoveAttachment}
								disabled={!formThumbnail?.id}
							>
								<FiTrash2 fontSize={14} strokeWidth={3} />
								Remover
							</RectangularButton>
						</S.ImageActions>
					</S.Row>
					{!!uploadError && (
						<Row>
							<S.UploadError>{uploadError}</S.UploadError>
						</Row>
					)}

					<S.Row mb={1.6}>
						<SelectField
							form={form}
							name="measure_unit"
							label="Unidade de medida"
							placeholder="Escolha a unidade de medida"
							options={measureUnitOptions}
							variant="rounded"
						/>
						<CurrencyInputField form={form} name="price" label="Preço" variant="gray" />
					</S.Row>
					<SelectField
						form={form}
						name="type"
						label="Tipo"
						placeholder="Escolha um tipo"
						options={typeOptions}
						variant="rounded"
					/>
				</Column>
			</Row>
			<S.Actions>
				<RectangularButton variant="outlined" colorVariant="red" onClick={closeModal}>
					Cancelar
				</RectangularButton>
				<RectangularButton
					type="submit"
					variant="filled"
					colorVariant="green"
					disabled={isSubmitting}
				>
					Editar Serviço
				</RectangularButton>
			</S.Actions>
		</S.Modal>
	);
};

EditServiceModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	revalidateServices: PropTypes.func.isRequired,
	revalidateKeywords: PropTypes.func.isRequired,
	keywordsOptions: PropTypes.arrayOf(PropTypes.shape({})),
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	thumbnail: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		url: PropTypes.string,
	}).isRequired,
	keywords: PropTypes.arrayOf(PropTypes.number),
	measure_unit: PropTypes.string,
	price: PropTypes.number,
	type: PropTypes.string,
};

EditServiceModal.defaultProps = {
	keywords: [],
	keywordsOptions: [],
	measure_unit: '',
	price: 0,
	type: '',
};

export default EditServiceModal;
