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

const Costs = ({ form, initialValues }) => {
	const { costs } = initialValues;

	const emptyValue = {
		description: '',
		type: '',
		quantity: '',
		value: '',
	};

	return (
		<Wrapper>
			<Repeater
				form={form}
				name="development_costs"
				title="Custos de Desenvolvimento"
				noInitialRow
				emptyValue={emptyValue}
				childsComponent={({ item, index, remove }) => (
					<CostsTable
						form={form}
						item={item}
						index={index}
						remove={remove}
						collection="development_costs"
					/>
				)}
				// eslint-disable-next-line no-shadow
				endComponent={({ append, emptyValue }) => (
					<CostsTableFooter
						collection="development_costs"
						emptyValue={emptyValue}
						append={append}
						form={form}
					/>
				)}
			/>
			<Repeater
				form={form}
				name="implementation_costs"
				title="Custos de Implantação"
				noInitialRow
				emptyValue={emptyValue}
				childsComponent={({ item, index, remove }) => (
					<CostsTable
						item={item}
						form={form}
						index={index}
						remove={remove}
						collection="implementation_costs"
					/>
				)}
				// eslint-disable-next-line no-shadow
				endComponent={({ append, emptyValue }) => (
					<CostsTableFooter
						collection="implementation_costs"
						emptyValue={emptyValue}
						append={append}
						form={form}
					/>
				)}
			/>
			<Repeater
				form={form}
				name="maintenence_costs"
				title="Custos de Manutenção"
				noInitialRow
				emptyValue={emptyValue}
				childsComponent={({ item, index, remove }) => (
					<CostsTable
						form={form}
						item={item}
						index={index}
						remove={remove}
						collection="maintenence_costs"
					/>
				)}
				// eslint-disable-next-line no-shadow
				endComponent={({ append, emptyValue }) => (
					<CostsTableFooter
						collection="maintenence_costs"
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
						defaultValue={costs.notes}
						name="costs.notes"
						vertical
					/>
				</Cell>
			</Row>
			<Row>
				<Cell>
					<SwitchField
						form={form}
						name="costs.funding_required"
						defaultChecked={costs.funding_required}
						label="Necessário financiamento para desenvolvimento da technologia?"
					/>
				</Cell>
			</Row>
			<Row>
				<Watcher
					form={form}
					property="costs.funding_required"
					render={(element) => {
						if (!element) return null;

						return (
							<>
								<Cell>
									<SelectField
										form={form}
										label="Tipo de Financiamento"
										name="costs.funding_type"
										placeholder="Selecione o tipo de financiamento"
										validation={{ required: true }}
										defaultValue={fundingTypes.find(
											(status) => status.value === costs.funding_type,
										)}
										options={fundingTypes}
									/>
								</Cell>
								<Cell>
									<InputField
										form={form}
										label="Valor do Financiamento"
										name="costs.funding_value"
										defaultValue={costs.funding_value}
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
										name="costs.funding_status"
										placeholder="Selecione a situação do financiamento"
										validation={{ required: true }}
										defaultValue={fundingStatus.find(
											(status) => status.value === costs.funding_status,
										)}
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
	initialValues: PropTypes.shape({
		costs: PropTypes.shape({
			notes: PropTypes.string,
			funding_required: PropTypes.bool,
			funding_status: PropTypes.string,
			funding_value: PropTypes.number,
			funding_type: PropTypes.string,
		}),
	}),
};

Costs.defaultProps = {
	form: {},
	initialValues: {
		costs: {},
	},
};

export default Costs;
