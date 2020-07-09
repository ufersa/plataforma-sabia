/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { SwitchField, InputField, TextField, SelectField } from '../../Form';
import { Col, Row, Wrapper } from './styles';
import Repeater from '../../Form/Repeater';
import CostsTable from './CostsTable';
import CostsTableFooter from './CostsTableFooter';

const Costs = ({ form }) => {
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
				<Col>
					<TextField form={form} label="Observações" name="notes" vertical />
				</Col>
			</Row>
			<Row end>
				<Col>
					<SwitchField
						form={form}
						name="patent"
						label="Necessário financiamento para desenvolvimento da technologia?"
					/>
				</Col>
				<Col>
					<SelectField
						form={form}
						label="Tipo de Financiamento"
						name="financing_type"
						placeholder="Selecione o tipo de financiamento"
						validation={{ required: true }}
						options={[
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
						]}
					/>
				</Col>
				<Col>
					<InputField
						form={form}
						label="Valor do Financiamento"
						name="finacing_amount"
						placeholder="R$"
						validation={{ required: true }}
					/>
				</Col>
				<Col>
					<SelectField
						form={form}
						label="Situação do Financiamento"
						name="financing_status"
						placeholder="Selecione a situalçao do financiamento"
						validation={{ required: true }}
						options={[
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
						]}
					/>
				</Col>
			</Row>
		</Wrapper>
	);
};

Costs.propTypes = {
	form: PropTypes.shape({}),
};

Costs.defaultProps = {
	form: {},
};

export default Costs;
