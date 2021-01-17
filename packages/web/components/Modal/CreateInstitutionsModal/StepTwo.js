/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { InputField, MaskedInputField, SelectField } from '../../Form';
import { Cell, Row } from '../../Common';
import { beforeMaskedValueChange } from '../../../utils/helper';

const typeOptions = [
	{
		label: 'Público',
		value: 'public',
	},
	{
		label: 'Privado',
		value: 'private',
	},
	{
		label: 'Misto',
		value: 'mixed',
	},
	{
		label: 'Outro',
		value: 'other',
	},
];

const categoryOptions = [
	{
		label: 'Universidade',
		value: 'university',
	},
	{
		label: 'Instituto',
		value: 'institute',
	},
	{
		label: 'Associação',
		value: 'association',
	},
	{
		label: 'Fundação',
		value: 'foundation',
	},
	{
		label: 'Cooperativa',
		value: 'cooperative',
	},
	{
		label: 'Companhia',
		value: 'company',
	},
	{
		label: 'Outro',
		value: 'other',
	},
];

const StepTwo = ({ form }) => {
	const { setValue } = form;

	return (
		<>
			<Row>
				<Cell col={12}>
					<InputField
						form={form}
						label="E-mail para contato"
						name="email"
						type="email"
						variant="gray"
					/>
				</Cell>
			</Row>
			<Row>
				<Cell col={6}>
					<MaskedInputField
						form={form}
						name="phone_number"
						alwaysShowMask={false}
						label="Telefone"
						mask="(99) 9999-99999"
						maskChar={null}
						beforeMaskedValueChange={beforeMaskedValueChange}
						pattern={/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/}
						variant="gray"
						defaultValue=""
					/>
				</Cell>
				<Cell col={6}>
					<InputField
						form={form}
						label="Website"
						name="website"
						placeholder="https://exemplo.org"
						type="text"
						variant="gray"
					/>
				</Cell>
			</Row>
			<Row>
				<Cell col={6}>
					<SelectField
						form={form}
						name="type"
						label="Tipo"
						validation={{ required: true }}
						onChange={([option]) => {
							setValue('type', option.value);
							return option;
						}}
						options={typeOptions}
						variant="gray"
					/>
				</Cell>
				<Cell col={6}>
					<SelectField
						form={form}
						name="category"
						label="Categoria"
						validation={{ required: true }}
						onChange={([option]) => {
							setValue('category', option.value);
							return option;
						}}
						options={categoryOptions}
						variant="gray"
					/>
				</Cell>
			</Row>
		</>
	);
};

StepTwo.propTypes = {
	form: PropTypes.shape({
		watch: PropTypes.func,
		getValues: PropTypes.func,
		setValue: PropTypes.func,
	}),
};

StepTwo.defaultProps = {
	form: {},
};

export default StepTwo;
