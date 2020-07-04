/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '../../Form';
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
			<br />
			<Row>
				<Col>
					<TextField
						form={form}
						label="Observações"
						name="development_costs_notes"
						vertical
					/>
				</Col>
			</Row>
			<Repeater
				form={form}
				name="implementation_costs"
				title="Custos de Implantação"
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
			<br />
			<Row>
				<Col>
					<TextField label="Observações" form={form} name="implementation_costs_notes" />
				</Col>
			</Row>
			<Repeater
				form={form}
				name="maintenence_costs"
				title="Custos de Manutenção"
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
			<br />
			<Row>
				<Col>
					<TextField form={form} label="Observações" name="maintenence_costs_notes" />
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
