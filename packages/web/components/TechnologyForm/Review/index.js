import React from 'react';
import PropTypes from 'prop-types';
import Repeater from '../../Form/Repeater';
import Section from '../../Technology/Details/Section';
import TextValue from '../../Technology/Details/TextValue';
import { Cell, Row, Wrapper } from './styles';
import CostsTable from './Tables/Costs';
import ResponsiblesTable from './Tables/Responsibles';

const Review = ({ form }) => {
	const technology = form.getValues();

	const emptyValue = {
		title: '',
	};

	const fundingData = {
		types: [
			{
				value: 'public',
				label: 'Público',
			},
			{
				value: 'private',
				label: 'Privado',
			},
			{
				value: 'collective',
				label: 'Coletivo',
			},
		],
		status: [
			{
				value: 'not_acquired',
				label: 'Não adquirido',
			},
			{
				value: 'acquiring',
				label: 'Em aquisição',
			},
			{
				value: 'acquired',
				label: 'Já adquirido',
			},
		],
	};

	const getFundingLabelByValue = (scope, value) => {
		const keys = Object.keys(fundingData);

		if (!scope || !keys.some((key) => key === scope)) {
			return value;
		}

		const funding = fundingData[scope].find((data) => data.value === value);

		return funding?.label || value;
	};

	return (
		<Wrapper>
			<Repeater
				form={form}
				name="review"
				emptyValue={emptyValue}
				childsComponent={({ item }) => (
					<Row key={item.id}>
						<Cell col="2">
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
									value={technology.patent}
									boolean
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
									value={technology.technologyCosts?.funding_required}
									boolean
								/>
								<TextValue
									title="Tipo de Financiamento"
									value={getFundingLabelByValue(
										'types',
										technology.technologyCosts?.funding_type,
									)}
								/>
								<TextValue
									title="Valor do Financiamento"
									value={technology.technologyCosts?.funding_value}
								/>
								<TextValue
									title="Situação"
									value={getFundingLabelByValue(
										'status',
										technology.technologyCosts?.funding_status,
									)}
								/>
							</Section>

							<Section
								title="Custos da Tecnologia"
								color="lightGray"
								hideWhenIsEmpty={false}
							>
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
									data={technology?.technologyCosts?.costs?.maintenence_costs}
									totalColor="green"
								/>
							</Section>
						</Cell>

						<Cell col="2">
							<Section title="Objetivos" color="lightGray" hideWhenIsEmpty={false}>
								<TextValue
									title="Objetivo Principal"
									value={technology?.primary_purpose}
								/>
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
									value={technology.taxonomies?.locale}
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
									value={technology.contribution}
								/>
							</Section>

							<Section title="Riscos" color="lightGray" hideWhenIsEmpty={false}>
								<TextValue
									title="Riscos associados à tecnologia"
									value={technology?.risks}
								/>
							</Section>

							<Section title="Responsáveis" color="lightGray" hideWhenIsEmpty={false}>
								<ResponsiblesTable
									data={[
										technology?.technologyResponsibles?.owner,
										...technology?.technologyResponsibles?.users,
									]}
								/>
							</Section>
						</Cell>
					</Row>
				)}
			/>
		</Wrapper>
	);
};

Review.propTypes = {
	form: PropTypes.shape({
		getValues: PropTypes.func,
	}),
};

Review.defaultProps = {
	form: {},
};

export default Review;
