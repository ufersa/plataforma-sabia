import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaFilePdf } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import Videos from '../../Technology/Details/Videos';
import Section from '../../Technology/Details/Section';
import TextValue from '../../Technology/Details/TextValue';
import {
	Costs as CostsTable,
	Responsibles as ResponsiblesTable,
} from '../../Technology/Details/Tables';
import GeoLocation from '../../Technology/Details/Tabs/GeoLocation';
import {
	Cell,
	Row,
	Wrapper,
	Checkbox,
	UploadedImages,
	UploadedDocuments,
	UploadsTitle,
	IconRow,
	IconLink,
	Media,
} from './styles';
import { getFundingLabelByValue } from './helpers';
import { formatMoney } from '../../../utils/helper';
import { STATUS as statusEnum } from '../../../utils/enums/technology.enums';
import { internal as internalPages } from '../../../utils/consts/pages';
import RadioField from '../../Form/RadioField';
import { TechnologyProvider } from '../../Technology';

const Editor = dynamic(() => import('../../Editor'), {
	ssr: false,
});

const Review = ({ data: { technology }, form }) => {
	const [acceptedTerms, setAcceptedTerms] = useState({
		true_information: false,
		responsibility: false,
		respect_of_rights: false,
		judicial_accountability: false,
	});

	const responsibles = [
		technology.technologyResponsibles?.owner,
		...technology.technologyResponsibles?.users,
	];

	// eslint-disable-next-line consistent-return
	const handleAcceptedTerms = (type) => {
		if (technology?.status !== statusEnum.DRAFT) {
			return null;
		}

		const types = Object.keys(acceptedTerms);

		if (!type || !types.some((item) => item === type)) {
			return null;
		}

		setAcceptedTerms({
			...acceptedTerms,
			[type]: !acceptedTerms[type],
		});
	};

	return (
		<Wrapper>
			<Row>
				<Cell col="2">
					<Section title="Identificação" color="lightGray" hideWhenIsEmpty={false}>
						<TextValue title="Título" value={technology?.title} />
						<TextValue
							title="Nome Popular"
							value={technology?.taxonomies?.popular_name}
						/>
						<TextValue title="Sigla" value={technology?.taxonomies?.initials} />
						<TextValue title="Descrição" value={technology?.description} />
						<TextValue
							title="Grande área"
							value={technology['knowledge_area_id.0']?.label}
						/>
						<TextValue title="Area" value={technology['knowledge_area_id.1']?.label} />
						<TextValue
							title="Sub-área"
							value={technology['knowledge_area_id.2']?.label}
						/>
						<TextValue
							title="Especialidade"
							value={technology['knowledge_area_id.3']?.label}
						/>
						<TextValue
							title="Classificação"
							value={technology?.taxonomies?.classification}
						/>
						<TextValue title="Dimensão" value={technology?.taxonomies?.dimension} />
						<TextValue
							title="Público-alvo"
							value={technology?.taxonomies?.target_audience}
						/>
						<TextValue title="Bioma" value={technology?.taxonomies?.biome} />
						<TextValue
							title="Programa Governamental"
							value={technology?.taxonomies?.government_program}
						/>
						<TextValue
							title="Palavras-chave"
							value={technology?.taxonomies?.keywords}
						/>
					</Section>

					<Section title="Aspectos Legais" color="lightGray" hideWhenIsEmpty={false}>
						<TextValue
							title="Tecnologia Patenteada"
							value={technology?.patent}
							boolean
						/>
						<TextValue
							title="Proteção Intelectual"
							value={technology?.taxonomies?.intellectual_property}
						/>
					</Section>

					<Section
						title="Estágio de Desenvolvimento"
						color="lightGray"
						hideWhenIsEmpty={false}
					>
						<TextValue title="Escala TRL" value={technology?.taxonomies?.stage} />
					</Section>

					<Section title="Financiamento" color="lightGray" hideWhenIsEmpty={false}>
						<TextValue
							title="Necessita de Financiamento"
							value={technology?.technologyCosts?.funding_required}
							boolean
						/>
						<TextValue
							title="Tipo de Financiamento"
							value={getFundingLabelByValue(
								'types',
								technology?.technologyCosts?.funding_type,
							)}
						/>
						<TextValue
							title="Valor do Financiamento"
							value={technology?.technologyCosts?.funding_value}
						/>
						<TextValue
							title="Situação"
							value={getFundingLabelByValue(
								'status',
								technology?.technologyCosts?.funding_status,
							)}
						/>
					</Section>

					<Section title="Custos da Tecnologia" color="lightGray" hideWhenIsEmpty={false}>
						<TextValue
							title="Valor da Tecnologia"
							value={formatMoney(technology?.technologyCosts?.price)}
						/>
						<TextValue
							title="Essa tecnologia é vendida por mim"
							value={technology?.technologyCosts?.is_seller}
							boolean
						/>
						<CostsTable
							title="Custo de Desenvolvimento"
							data={technology?.technologyCosts?.costs?.development_costs}
							totalColor="green"
						/>
						<CostsTable
							title="Custos de Implantação"
							data={technology?.technologyCosts?.costs?.implementation_costs}
						/>
						<CostsTable
							title="Custos de Manutenção"
							data={technology?.technologyCosts?.costs?.maintenance_costs}
							totalColor="green"
						/>
					</Section>

					<Section title="Documentos" color="lightGray" hideWhenIsEmpty={false}>
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

						<UploadsTitle>Vídeos da Tecnologia</UploadsTitle>
						{technology.videos?.length ? (
							<Videos data={technology.videos} />
						) : (
							<p>Nenhum vídeo cadastrado</p>
						)}

						<UploadsTitle>Documentos da Tecnologia</UploadsTitle>
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
					</Section>
				</Cell>

				<Cell col="2">
					<Section title="Objetivos" color="lightGray" hideWhenIsEmpty={false}>
						<TextValue title="Objetivo Principal" value={technology?.primary_purpose} />
						<TextValue
							title="Objetivos secundários"
							value={technology?.secondary_purpose}
						/>
					</Section>

					<Section title="Problematização" color="lightGray" hideWhenIsEmpty>
						<TextValue
							title="Problemas que a tecnologia soluciona"
							value={technology?.solves_problem}
						/>
						<TextValue
							title="Problemas que a tecnologia acarreta"
							value={technology?.entailes_problem}
						/>
					</Section>

					<Section title="Aplicação" color="lightGray" hideWhenIsEmpty={false}>
						<TextValue
							title="Onde é a Aplicação"
							value={technology?.taxonomies?.locale}
						/>
						<TextValue
							title="Forma de Aplicação"
							value={technology?.application_mode}
						/>
						<TextValue
							title="Exemplos de Aplicação"
							value={technology?.application_examples}
						/>
						<TextValue
							title="Pré-requisitos para a implantação"
							value={technology?.taxonomies?.prerequisites_for_deployment}
						/>
						<TextValue
							title="Duração do processo de instalação da tecnologia (em dias)"
							value={technology?.taxonomies?.installation_time}
						/>
					</Section>

					<Section title="Contribuição" color="lightGray" hideWhenIsEmpty={false}>
						<TextValue
							title="Contribuição para o semiárido"
							value={technology?.contribution}
						/>
					</Section>

					<Section title="Riscos" color="lightGray" hideWhenIsEmpty={false}>
						<TextValue
							title="Riscos associados à tecnologia"
							value={technology?.risks}
						/>
					</Section>

					<Section title="Mapas" color="lightGray" hideWhenIsEmpty={false}>
						<TechnologyProvider technology={technology}>
							<GeoLocation stacked />
						</TechnologyProvider>
					</Section>

					<Section title="Responsáveis" color="lightGray" hideWhenIsEmpty={false}>
						<ResponsiblesTable data={responsibles} hideLattesInfo />
					</Section>
				</Cell>
			</Row>

			<Row>
				<Cell>
					<Section title="Observações" color="lightGray" hideWhenIsEmpty={false}>
						<Editor
							config={{
								placeholder: 'Digite suas observações para o curador aqui',
								removePlugins: ['ImageUpload', 'Table', 'MediaEmbed'],
							}}
							form={form}
							name="comment"
						/>

						{technology.status !== statusEnum.DRAFT && (
							<RadioField
								label="Finalizar edição da tecnologia e enviar para análise do curador?"
								form={form}
								name="sendToReviewer"
								options={[
									{ id: 1, label: 'Sim', value: true },
									{ id: 2, label: 'Não', value: false },
								]}
								help="Ao confirmar o envio, a tecnologia será analisada por um curador especialista na área."
								validation={{ required: true }}
							/>
						)}
					</Section>
				</Cell>
			</Row>

			{technology?.status === statusEnum.DRAFT && (
				<Row>
					<Cell>
						<Section
							title="Termos de Aceitação"
							color="lightGray"
							hideWhenIsEmpty={false}
						>
							<Checkbox
								name="acceptTrueInformationTerms"
								value={acceptedTerms.true_information}
								onChange={() => handleAcceptedTerms('true_information')}
								label={
									<span>
										Declaro ciência de que devo fornecer apenas informações
										verdadeiras no cadastro das tecnologias. Veja mais nos{' '}
										<a
											href={internalPages.termsOfUse}
											rel="noreferrer"
											target="_blank"
										>
											Termos e Condições de Uso
										</a>
										.
									</span>
								}
								required
							/>
							<Checkbox
								name="acceptResponsibilityTerms"
								value={acceptedTerms.responsibility}
								onChange={() => handleAcceptedTerms('responsibility')}
								label={
									<span>
										Estou ciente de que as informações cadastradas são de minha
										inteira responsabilidade, e a Plataforma Sabiá não
										responderá por quaisquer violações ao Direito de Propriedade
										Intelectual e Direito Autoral de terceiros. Veja mais nos{' '}
										<a
											href={internalPages.termsOfUse}
											rel="noreferrer"
											target="_blank"
										>
											Termos e Condições de Uso
										</a>
										.
									</span>
								}
								required
							/>
							<Checkbox
								name="acceptRespectRightsTerms"
								value={acceptedTerms.respect_of_rights}
								onChange={() => handleAcceptedTerms('respect_of_rights')}
								label={
									<span>
										Estou ciente de que poderei ser penalizado com advertência,
										suspensão e encerramento da minha conta por eventuais
										violações a direitos de terceiros no cadastro das
										tecnologias, como o Direito de Propriedade Intelectual e
										Direito Autoral. Veja mais nos{' '}
										<a
											href={internalPages.termsOfUse}
											rel="noreferrer"
											target="_blank"
										>
											Termos e Condições de Uso
										</a>
										.
									</span>
								}
								required
							/>
							<Checkbox
								name="acceptJudicialAccountabilityTerms"
								value={acceptedTerms.judicial_accountability}
								onChange={() => handleAcceptedTerms('judicial_accountability')}
								label={
									<span>
										Declaro ciência de que as transgressões a direitos de
										terceiros no cadastro das tecnologias podem implicar em
										responsabilização na esfera jurisdicional cível e criminal.
										Veja mais nos{' '}
										<a
											href={internalPages.termsOfUse}
											rel="noreferrer"
											target="_blank"
										>
											Termos e Condições de Uso
										</a>
										.
									</span>
								}
								required
							/>
						</Section>
					</Cell>
				</Row>
			)}
		</Wrapper>
	);
};

Review.propTypes = {
	form: PropTypes.shape({
		getValues: PropTypes.func,
	}),
	data: PropTypes.shape({
		technology: PropTypes.shape({
			id: PropTypes.number,
			title: PropTypes.string,
			description: PropTypes.string,
			application_mode: PropTypes.string,
			application_examples: PropTypes.string,
			entailes_problem: PropTypes.string,
			solves_problem: PropTypes.string,
			primary_purpose: PropTypes.string,
			secondary_purpose: PropTypes.string,
			taxonomies: PropTypes.shape({
				popular_name: PropTypes.string,
				initials: PropTypes.string,
				classification: PropTypes.string,
				dimension: PropTypes.string,
				target_audience: PropTypes.string,
				government_program: PropTypes.string,
				installation_time: PropTypes.number,
				prerequisites_for_deployment: PropTypes.string,
				locale: PropTypes.string,
				stage: PropTypes.string,
				intellectual_property: PropTypes.string,
				keywords: PropTypes.string,
				biome: PropTypes.string,
			}),
			attachments: PropTypes.shape({
				images: PropTypes.arrayOf(PropTypes.shape({})),
				documents: PropTypes.arrayOf(PropTypes.shape({})),
			}),
			technologyResponsibles: PropTypes.shape({
				owner: PropTypes.shape({}),
				users: PropTypes.arrayOf(PropTypes.shape({})),
			}),
			technologyCosts: PropTypes.shape({
				costs: PropTypes.shape({
					maintenance_costs: PropTypes.shape({}),
					development_costs: PropTypes.shape({}),
					implementation_costs: PropTypes.shape({}),
				}),
				is_seller: PropTypes.number,
				price: PropTypes.string,
				funding_status: PropTypes.string,
				funding_type: PropTypes.string,
				funding_required: PropTypes.number,
				funding_value: PropTypes.string,
			}),
			patent: PropTypes.number,
			videos: PropTypes.arrayOf(PropTypes.shape({})),
			status: PropTypes.string,
			'knowledge_area_id.0': PropTypes.shape({ label: PropTypes.string }),
			'knowledge_area_id.1': PropTypes.shape({ label: PropTypes.string }),
			'knowledge_area_id.2': PropTypes.shape({ label: PropTypes.string }),
			'knowledge_area_id.3': PropTypes.shape({ label: PropTypes.string }),
			risks: PropTypes.string,
			contribution: PropTypes.string,
			rawTerms: PropTypes.arrayOf(PropTypes.shape({})),
		}),
	}),
};

Review.defaultProps = {
	form: {},
	data: {
		technology: {
			id: null,
			attachments: {
				images: [],
				documents: [],
			},
			technologyResponsibles: {
				owner: {},
				users: [{}],
			},
			videos: [],
		},
	},
};

export default Review;
