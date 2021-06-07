/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styled, { css, useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FiEdit3, FiImage } from 'react-icons/fi';
import Dropzone from 'react-dropzone';

import { Title } from '../../components/Common';
import {
	InputField,
	TextField,
	SelectField,
	CurrencyInputField,
	HtmlViewField,
	Watcher,
	InputHiddenField,
} from '../../components/Form';
import { RectangularButton } from '../../components/Button';
import { measureUnitOptions, typeOptions } from '../../utils/service';
import { createService, deleteService, createTerm, getTerms } from '../../services';
import { formatCurrencyToInt, formatMoney, mapArrayOfObjectToSelect } from '../../utils/helper';
import { Protected } from '../../components/Authorization';
import { toast } from '../../components/Toast';
import { useAuth, useModal } from '../../hooks';
import { upload } from '../../services/uploads';

const prepareFormData = (values) => ({
	...values,
	keywords: values.keywords.map((keyword) => keyword.value),
	measure_unit: values.measure_unit.value,
	type: values.type.value,
	price: formatCurrencyToInt(values.price),
});

const NewServicePage = ({ keywordTerms }) => {
	const form = useForm({
		defaultValues: {
			name: '',
			keywords: null,
			description: '',
			measure_unit: null,
			price: '',
			type: null,
			payment_message: '',
			thumbnail_id: null,
		},
	});
	const { colors } = useTheme();
	const [addedServices, setAddedServices] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [uploadError, setUploadError] = useState('');
	const [thumbnailPreview, setThumbnailPreview] = useState('');
	const router = useRouter();
	const { user } = useAuth();
	const { openModal } = useModal();

	const handleSubmit = async (values, _, isFinalize) => {
		setIsSubmitting(true);

		const preparedData = prepareFormData(values);
		const result = await createService(preparedData);

		if (result) {
			toast.success('Serviço criado com sucesso!');
			form.reset();
			setThumbnailPreview(null);
			setAddedServices((prevValue) => [...prevValue, result]);
		} else {
			return toast.error('Erro ao criar serviço, tente novamente em instantes');
		}

		if (isFinalize) {
			return router.push('/');
		}

		return setIsSubmitting(false);
	};

	const handleDeleteService = async (serviceId) => {
		setIsSubmitting(true);

		const result = await deleteService(serviceId);

		if (!result)
			toast.error(
				'Ocorreu um erro ao tentar deletar o serviço. Tente novamente em instantes',
			);
		else {
			toast.success('Serviço deletado com sucesso');
			setAddedServices((prevValue) => prevValue.filter((item) => item.id !== serviceId));
		}

		setIsSubmitting(false);
	};

	/*
	 * If user's adding the first service he can click in finalize button so it'll
	 * add the service and then redirect to home
	 * If user already added some services he can click in finalize button and then
	 * he'll be just redirected to home
	 * The advantage is that user can register only one service and get redirected to home
	 * in just one click
	 */
	const handleFinalizeRegistration = async () => {
		if (addedServices.length) {
			return router.push('/');
		}

		const isValidForm = await form.triggerValidation();
		if (isValidForm) {
			await handleSubmit(form.getValues(), null, true);
		}

		return true;
	};

	const onCreateTerm = async (inputValue, taxonomy) => {
		const term = await createTerm(inputValue, taxonomy);
		return { label: term.term, value: `${term.id}` };
	};

	const onDropAttachment = async (acceptedFiles) => {
		if (!acceptedFiles) return null;

		const formData = new FormData();
		if (acceptedFiles.length !== 0) {
			formData.append(`files[0]`, acceptedFiles[0], acceptedFiles[0].name);
		}

		const response = await upload(formData);

		if (response.status === 200) {
			const { id, url } = response.data[0];
			setThumbnailPreview(url);
			form.setValue('thumbnail_id', id);
		} else {
			setUploadError(response.data.error.message[0].message);
		}

		return true;
	};

	return (
		<Wrapper>
			<Protected>
				<Container onSubmit={form.handleSubmit(handleSubmit)}>
					<Details>
						<Title align="left" color={colors.black}>
							Novo serviço
						</Title>

						<Fields>
							<Dropzone
								accept="image/*"
								onDrop={(acceptedFiles) => onDropAttachment(acceptedFiles)}
								multiple={false}
							>
								{({ getRootProps, getInputProps }) => (
									<UploadWrapper>
										{thumbnailPreview && (
											<ThumbnailWrapper>
												<Image
													src={thumbnailPreview}
													width={80}
													height={80}
													alt="Service thumbnail"
												/>
											</ThumbnailWrapper>
										)}
										<UploadThumbnail {...getRootProps()}>
											<UploadBody>
												<FiImage fontSize={24} />
												<div>
													<p>Selecione uma imagem de capa</p>
													<p>Limite de 5mb</p>
												</div>
											</UploadBody>
											<input name="logo" {...getInputProps()} />
										</UploadThumbnail>
										{uploadError && <UploadError>{uploadError}</UploadError>}
									</UploadWrapper>
								)}
							</Dropzone>
							<InputHiddenField form={form} name="thumbnail_id" />

							<Inputs>
								<InputField
									form={form}
									name="name"
									label="Nome do serviço"
									validation={{ required: true }}
									placeholder="Digite o nome"
									variant="gray"
								/>

								<SelectField
									form={form}
									name="keywords"
									instanceId="keywords-select"
									placeholder="Busque por palavras chaves (pode adicionar mais de um item)"
									label="Palavras-chave"
									validation={{ required: true }}
									options={mapArrayOfObjectToSelect(keywordTerms, 'term', 'id')}
									onCreate={(inputValue) => onCreateTerm(inputValue, 'KEYWORDS')}
									variant="gray"
									isMulti
									creatable
								/>

								<TextField
									form={form}
									name="description"
									validation={{ required: true }}
									label="Descrição"
									placeholder="Digite a descrição"
									variant="gray"
									resize="none"
								/>

								<SelectField
									form={form}
									name="measure_unit"
									instanceId="measure_unit-select"
									label="Unidade de Medida"
									placeholder="Escolha uma unidade"
									validation={{ required: true }}
									options={measureUnitOptions}
									variant="rounded"
								/>

								<CurrencyInputField
									form={form}
									name="price"
									validation={{ required: true }}
									label="Preço"
									placeholder="Digite o preço"
									variant="gray"
								/>

								<SelectField
									form={form}
									name="type"
									instanceId="type-select"
									label="Tipo"
									placeholder="Escolha um tipo"
									validation={{ required: true }}
									options={typeOptions}
									variant="rounded"
								/>
							</Inputs>

							<RectangularButton
								disabled={isSubmitting}
								variant="outlined"
								colorVariant="blue"
								type="submit"
								fullWidth
							>
								Adicionar novo serviço
							</RectangularButton>
							<RectangularButton
								variant="filled"
								colorVariant="orange"
								disabled={isSubmitting}
								onClick={handleFinalizeRegistration}
								fullWidth
							>
								Finalizar cadastro
							</RectangularButton>
						</Fields>

						<PaymentMessage>
							<div>
								<p>Responsável:</p>
								<p>{user.full_name}</p>

								<p>Instituição:</p>
								<p>{user.institution?.name}</p>
							</div>

							<Watcher
								form={form}
								property="payment_message"
								render={(paymentMessageHtml) => (
									<HtmlViewField
										label="Mensagem de pagamento"
										placeholder="Insira a mensagem de pagamento"
										html={paymentMessageHtml}
									/>
								)}
							/>

							<RectangularButton
								fullWidth
								variant="text"
								colorVariant="blue"
								onClick={() =>
									openModal(
										'ckEditor',
										{
											form,
											name: 'payment_message',
											config: {
												placeholder: 'Insira a mensagem de pagamento',
												removePlugins: [
													'ImageUpload',
													'Table',
													'MediaEmbed',
												],
											},
											onChange: (editorData) =>
												form.setValue('payment_message', editorData),
											renderWithController: false,
											defaultValue: form.getValues()?.payment_message,
										},
										{
											customModal: true,
											overlayClick: false,
										},
									)
								}
							>
								<FiEdit3 fontSize={14} />
								Editar mensagem
							</RectangularButton>
							<InputHiddenField form={form} name="payment_message" />
						</PaymentMessage>
					</Details>

					<Review>
						<Title align="left" color={colors.black}>
							Serviços
						</Title>

						{addedServices.map((service) => (
							<ServiceCard key={service.id}>
								<div>
									<ServiceThumbnailWrapper>
										<Image
											src={service.thumbnail?.url || '/card-image.jpg'}
											width={80}
											height={80}
										/>
									</ServiceThumbnailWrapper>

									<ServiceInfos>
										<p>{service.name}</p>
										<span>{service.description}</span>
										<p>{formatMoney(service.price)}</p>
									</ServiceInfos>
								</div>

								<RectangularButton
									variant="text"
									colorVariant="red"
									onClick={() => handleDeleteService(service.id)}
								>
									Remover
								</RectangularButton>
							</ServiceCard>
						))}
					</Review>
				</Container>
			</Protected>
		</Wrapper>
	);
};

NewServicePage.getInitialProps = async () => {
	const keywordTerms = await getTerms({ taxonomy: 'KEYWORDS', embed: 'false' });

	return {
		keywordTerms,
	};
};

NewServicePage.propTypes = {
	keywordTerms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const Wrapper = styled.section`
	${({ theme: { colors } }) => css`
		display: flex;
		justify-content: center;
		background-color: ${colors.lightGray4};
		padding: 3.2rem 5%;
	`}
`;

const Container = styled.form`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		max-width: ${screens.large}px;
		width: 100%;

		@media screen and (min-width: ${screens.medium + 1}px) {
			flex-direction: row;
		}
	`}
`;

const Details = styled.div`
	${({ theme: { screens } }) => css`
		margin-bottom: 2.4rem;
		@media screen and (min-width: ${screens.medium + 1}px) {
			margin-right: 3.2rem;
			flex-basis: 45%;
			max-width: 37rem;
		}
	`}
`;

const Fields = styled.div`
	${({ theme: { colors, metrics } }) => css`
		background-color: ${colors.white};
		border-radius: ${metrics.baseRadius}rem;
		padding: 1.6rem;

		> button:first-of-type {
			margin-bottom: 1.6rem;
		}
	`}
`;

const Inputs = styled.div`
	> div {
		margin-bottom: 1.9rem;
	}

	> div:nth-of-type(2) {
		margin-bottom: 1.4rem;
	}

	> div:nth-of-type(3) {
		margin-bottom: 0.9rem;
	}
`;

const UploadWrapper = styled.div`
	margin-bottom: 2.4rem;
`;

const UploadThumbnail = styled.div`
	${({ theme: { colors, metrics } }) => css`
		position: relative;
		padding: 0.8rem;
		color: ${colors.secondary};
		line-height: 2.4rem;
		cursor: pointer;
		border-radius: ${metrics.baseRadius}rem;
		overflow: hidden;

		&:focus {
			box-shadow: 0px 0px 4px 2px ${colors.primary};
		}

		&:before {
			content: '';
			position: absolute;
			display: block;
			background-color: ${colors.secondary};
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			opacity: 0.1;
		}
	`}
`;

const UploadBody = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;

		> svg {
			margin-right: 1.4rem;
		}

		> div > p:first-child {
			font-size: 1.6rem;
			font-weight: 500;
		}

		> div > p:last-child {
			color: ${colors.lightGray2};
			font-size: 1.2rem;
			font-weight: 500;
		}
	`}
`;

const UploadError = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.red};
		margin-top: 0.4rem;
	`}
`;

const ThumbnailWrapper = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		justify-content: center;
		margin-bottom: 1.4rem;

		> div {
			border: 2px solid ${colors.secondary};
			border-radius: 50%;
		}
	`}
`;

const PaymentMessage = styled.div`
	${({ theme: { colors, metrics } }) => css`
		border-radius: ${metrics.baseRadius}rem;
		padding: 1.6rem;
		margin-top: 3.2rem;
		background-color: ${colors.white};

		> div:first-child {
			display: grid;
			grid-template-columns: max-content 1fr;
			grid-column-gap: 0.8rem;
			margin-bottom: 1.2rem;

			> p {
				font-size: 1.4rem;
				font-weight: 500;
				line-height: 2.4rem;
				color: ${colors.lightGray2};
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}

		button {
			margin-top: 1.9rem;
		}
	`}
`;

const ServiceCard = styled.div`
	${({ theme: { colors, metrics, screens } }) => css`
		padding: 1.6rem;
		background-color: ${colors.white};
		border-radius: ${metrics.baseRadius}rem;

		display: flex;
		justify-content: space-between;
		margin-bottom: 1.6rem;

		> div:first-child {
			display: flex;
			flex-grow: 1;
			margin-right: 1.6rem;
		}

		button {
			width: fit-content;
			align-self: flex-start;
		}

		@media screen and (max-width: ${screens.small}px) {
			flex-direction: column;

			> div:first-child {
				flex-direction: column;
			}
		}
	`}
`;

const ServiceThumbnailWrapper = styled.div`
	${({ theme: { metrics } }) => css`
		max-width: 8rem;
		width: 100%;
		margin-right: 1.6rem;
		> div {
			border-radius: ${metrics.baseRadius}rem;
		}
	`}
`;

const ServiceInfos = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-direction: column;
		max-width: 49rem;
		> p {
			font-size: 1.6rem;
			font-weight: 500;
			line-height: 2.4rem;
			color: ${colors.black};
			margin-bottom: 0.8rem;
		}
		> span {
			font-size: 1.2rem;
			font-weight: 500;
			line-height: 1.6rem;
			color: ${colors.lightGray2};
			margin-bottom: 0.8rem;
			white-space: pre-line;
			word-break: break-word;
		}
		> p:last-child {
			font-size: 1.4rem;
		}
	`}
`;

const Review = styled.div`
	flex-grow: 1;
`;

export default NewServicePage;
