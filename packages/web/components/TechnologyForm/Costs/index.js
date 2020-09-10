/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { SwitchField, InputField, TextField, SelectField, Watcher } from '../../Form';
import { Wrapper } from './styles';
import Repeater from '../../Form/Repeater';
import CostsTable from './CostsTable';
import CostsTableFooter from './CostsTableFooter';
import { Cell, Row } from '../../Common/Layout';

const fundingTypes = [
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
];

const fundingStatus = [
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
];

const Costs = ({ form, data }) => {
	const emptyValue = {
		description: '',
		type: '',
		quantity: '',
		value: '',
	};

	const shouldShowDevelopmentCosts = Boolean(
		data.technology.terms.stage[0] && [7, 8, 9].includes(data.technology.terms.stage[0]),
	);

	return (
		<Wrapper>
			{shouldShowDevelopmentCosts && (
				<Repeater
					form={form}
					withBorder
					name="technologyCosts.costs.development_costs"
					title="Custos de Desenvolvimento"
					help={
						<p>
							São custos relativos ao desenvolvimento da plataforma. Destinado a
							tecnologias que ainda não estão finalizadas.
							<br /> Os custos de desenvolvimento envolvem toda a necessidade de
							material, serviços e equipamentos durante a fase de construção.
							<br /> Esse tipo de informação é útil para os investidores conhecerem os
							custos relativos à tecnologia.
						</p>
					}
					noInitialRow
					emptyValue={emptyValue}
					childsComponent={({ item, index, remove }) => (
						<CostsTable
							form={form}
							item={item}
							index={index}
							remove={remove}
							collection="technologyCosts.costs.development_costs"
						/>
					)}
					// eslint-disable-next-line no-shadow
					endComponent={({ append, emptyValue }) => (
						<CostsTableFooter
							collection="technologyCosts.costs.development_costs"
							emptyValue={emptyValue}
							append={append}
							form={form}
						/>
					)}
				/>
			)}
			<Repeater
				form={form}
				name="technologyCosts.costs.implementation_costs"
				title="Custos de Implantação"
				help={
					<p>
						Para tecnologias já em fase de comercialização, informe quais os custos da
						implantação. Se a tecnologia não estiver nenhum custo relacionado com a
						implantação, informar o valor aproximado da tecnologia em si.
					</p>
				}
				withBorder
				noInitialRow
				emptyValue={emptyValue}
				childsComponent={({ item, index, remove }) => (
					<CostsTable
						item={item}
						form={form}
						index={index}
						remove={remove}
						collection="technologyCosts.costs.implementation_costs"
					/>
				)}
				// eslint-disable-next-line no-shadow
				endComponent={({ append, emptyValue }) => (
					<CostsTableFooter
						collection="technologyCosts.costs.implementation_costs"
						emptyValue={emptyValue}
						append={append}
						form={form}
					/>
				)}
			/>
			<Repeater
				form={form}
				name="technologyCosts.costs.maintenence_costs"
				title="Custos de Manutenção"
				help={
					<p>
						Qual o custo médio da manutenção anual da tecnologia? Informar
						detalhadamente o que precisa ser feito para manutenções preventivas da
						tecnologia no período de 1 ano.
					</p>
				}
				noInitialRow
				withBorder
				emptyValue={emptyValue}
				childsComponent={({ item, index, remove }) => (
					<CostsTable
						form={form}
						item={item}
						index={index}
						remove={remove}
						collection="technologyCosts.costs.maintenence_costs"
					/>
				)}
				// eslint-disable-next-line no-shadow
				endComponent={({ append, emptyValue }) => (
					<CostsTableFooter
						collection="technologyCosts.costs.maintenence_costs"
						emptyValue={emptyValue}
						append={append}
						form={form}
					/>
				)}
			/>
			<Row>
				<Cell>
					<TextField
						form={form}
						label="Observações"
						help={
							<p>
								Descreva detalhes dos custos da sua tecnologia que precisa de alguma
								<br /> explicação mais detalhada.
							</p>
						}
						name="technologyCosts.notes"
						vertical
					/>
				</Cell>
			</Row>
			<Row>
				<Cell>
					<SwitchField
						form={form}
						name="technologyCosts.funding_required"
						label="Necessário financiamento para desenvolvimento da technologia?"
						help={
							<p>
								Informe se você deseja recursos financeiros para desenvolver sua
								tecnologia ou colocá-la em produção em escala. Esses dados não
								estarão disponibilizados na área pública da plataforma. Apenas os
								parceiros financiadores terão acesso a esses dados para oferecer a
								melhor opção para os desenvolvedores.
							</p>
						}
					/>
				</Cell>
			</Row>
			<Row>
				<Watcher
					form={form}
					property="technologyCosts.funding_required"
					render={(element) => {
						if (!element) return null;

						return (
							<>
								<Cell>
									<SelectField
										form={form}
										label="Tipo de Financiamento"
										help={
											<p>
												Você deseja um financiamento de bancos e
												investidores (privados), editais de fomento à
												pesquisa (público) ou financiamento coletivo
												(crowdfunding)?
											</p>
										}
										name="technologyCosts.funding_type"
										placeholder="Selecione o tipo de financiamento"
										validation={{ required: true }}
										options={fundingTypes}
									/>
								</Cell>
								<Cell>
									<InputField
										form={form}
										label="Valor do Financiamento"
										name="technologyCosts.funding_value"
										placeholder="R$"
										validation={{
											required: true,
											pattern: {
												value: /^[0-9]*$/,
												message: 'Você deve digitar apenas números',
											},
										}}
									/>
								</Cell>
								<Cell>
									<SelectField
										form={form}
										label="Situação do Financiamento"
										name="technologyCosts.funding_status"
										placeholder="Selecione a situação do financiamento"
										options={fundingStatus}
									/>
								</Cell>
							</>
						);
					}}
				/>
			</Row>
		</Wrapper>
	);
};

Costs.propTypes = {
	form: PropTypes.shape({}),
	data: PropTypes.shape({
		technology: PropTypes.shape({
			terms: PropTypes.shape({
				stage: PropTypes.arrayOf(PropTypes.number),
			}),
		}),
	}),
};

Costs.defaultProps = {
	form: {},
	data: {
		technology: {
			terms: {
				stage: [],
			},
		},
	},
};

export default Costs;
