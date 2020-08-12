import React from 'react';
import PropTypes from 'prop-types';
import * as Layout from '../../Common/Layout';
import Repeater from '../../Form/Repeater';
import Section from '../../Technology/Details/Section';
import TextValue from '../../Technology/Details/TextValue';
import { Row, Wrapper } from './styles';

const Review = ({ form }) => {
	const technology = form.getValues();

	return (
		<Wrapper>
			<Repeater
				form={form}
				name="review"
				childsComponent={({ item }) => (
					<Row key={item.id}>
						<Layout.Cell col="2">
							<Section
								title="Identificação"
								color="lightGray"
								hideWhenIsEmpty={false}
							>
								<TextValue title="Título" value={technology.title} />
								<TextValue
									title="Nome Popular"
									value={technology.taxonomies?.popular_name}
								/>
								<TextValue title="Sigla" value={technology.taxonomies?.initials} />
								<TextValue title="Descrição" value={technology.description} />
								<TextValue
									title="Categoria"
									value={technology.taxonomies?.category}
								/>
								<TextValue
									title="Classificação"
									value={technology.taxonomies?.classification}
								/>
								<TextValue
									title="Dimensão"
									value={technology.taxonomies?.dimension}
								/>
								<TextValue
									title="Público-alvo"
									value={technology.taxonomies?.target_audience}
								/>
								<TextValue title="Bioma" value={technology.taxonomies?.biome} />
								<TextValue
									title="Programa Governamental"
									value={technology.taxonomies?.government_program}
								/>
								<TextValue
									title="Palavras-chave"
									value={technology.taxonomies?.keywords}
								/>
							</Section>

							<Section
								title="Aspectos Legais"
								color="lightGray"
								hideWhenIsEmpty={false}
							>
								<TextValue
									title="Tecnologia Patenteada"
									value={technology.patent ? 'Sim' : 'Não'}
								/>
								<TextValue
									title="Proteção Intelectual"
									value={technology.taxonomies?.intellectual_property}
								/>
							</Section>

							<Section
								title="Estágio de Desenvolvimento"
								color="lightGray"
								hideWhenIsEmpty={false}
							>
								<TextValue
									title="Escala TRL"
									value={technology.taxonomies?.stage}
								/>
							</Section>

							<Section
								title="Financiamento"
								color="lightGray"
								hideWhenIsEmpty={false}
							>
								<TextValue
									title="Necessita de Financiamento"
									value={technology.technologyCosts?.costs?.funding_required}
								/>
								<TextValue
									title="Tipo de Financiamento"
									value={technology.technologyCosts?.costs?.funding_type}
								/>
								<TextValue
									title="Valor do Financiamento"
									value={technology.technologyCosts?.costs?.funding_value}
								/>
								<TextValue
									title="Situação"
									value={technology.technologyCosts?.costs?.funding_status}
								/>
							</Section>
						</Layout.Cell>

						<Layout.Cell col="2">
							<Section title="Objetivos" color="lightGray" hideWhenIsEmpty={false}>
								<TextValue
									title="Objetivo Principal"
									value={technology.taxonomies?.primary_objective}
								/>
								<TextValue
									title="Objetivos secundários"
									value={technology.taxonomies?.secondary_objectives}
								/>
							</Section>

							<Section
								title="Problematização"
								color="lightGray"
								hideWhenIsEmpty={false}
							>
								<TextValue
									title="Problemas que a tecnologia soluciona"
									value={technology.taxonomies?.problematization}
								/>
								<TextValue
									title="Problemas que a tecnologia acarreta"
									value={technology.taxonomies?.problems_caused}
								/>
							</Section>

							<Section title="Aplicação" color="lightGray" hideWhenIsEmpty={false}>
								<TextValue
									title="Onde é a Aplicação"
									value={technology.taxonomies?.locale}
								/>
								<TextValue
									title="Aplicação"
									value={technology.taxonomies?.application}
								/>
								<TextValue
									title="Exemplos de Aplicação"
									value={technology.taxonomies?.application_examples}
								/>
								<TextValue
									title="Pré-requisitos para a implantação"
									value={technology.taxonomies?.prerequisites_for_deployment}
								/>
								<TextValue
									title="Duração do processo de instalação da tecnologia"
									value={technology.taxonomies?.installation_time}
								/>
							</Section>

							<Section title="Contribuição" color="lightGray" hideWhenIsEmpty={false}>
								<TextValue
									title="Contribuição para o semiárido"
									value={technology.taxonomies?.contribution_to_semiarid}
								/>
							</Section>

							<Section title="Riscos" color="lightGray" hideWhenIsEmpty={false}>
								<TextValue
									title="Riscos associados à tecnologia"
									value={technology.taxonomies?.riskiness}
								/>
							</Section>
						</Layout.Cell>
					</Row>
				)}
			/>
		</Wrapper>
	);
};

Review.propTypes = {
	form: PropTypes.shape({
		getValues: PropTypes.func.isRequired,
	}),
};

Review.defaultProps = {
	form: {},
};

export default Review;
