import React from 'react';
import PropTypes from 'prop-types';
import { InputField, TextField, SelectField, SwitchField } from '../Form';
import { ColumnCotainer, Column } from '../Common';

const AboutTechnology = ({ form }) => {
	return (
		<ColumnCotainer>
			<Column>
				<InputField
					form={form}
					name="name"
					label="Título da Tecnologia"
					validation={{ required: true }}
					help={<p>Este é o título da sua tecnologia</p>}
				/>
				<TextField
					form={form}
					name="description"
					label="Descrição da Tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<SelectField
					form={form}
					name="audience"
					placeholder="Escolha pelo menos um"
					label="Público-alvo da tecnologia"
					isMulti
					help={<p>Help Text</p>}
					options={[
						{
							label: 'Agricultores',
							value: 'agricultores',
						},
						{
							label: 'Políticos',
							value: 'politicos',
						},
					]}
				/>
				<SelectField
					form={form}
					name="bioma"
					placeholder="Escolha um termo"
					label="Bioma Principal da Tecnologia"
					help={<p>Help Text</p>}
					options={[
						{
							label: 'Option 1',
							value: 'option-1',
						},
						{
							label: 'Option 2',
							value: 'option-2',
						},
					]}
				/>
				<SelectField
					form={form}
					name="program"
					placeholder="Busque por um programa de governo (pode adicionar mais de um)"
					label="Público-alvo da tecnologia"
					isMulti
					help={<p>Help Text</p>}
					options={[
						{
							label: 'Option 1',
							value: 'option-1',
						},
						{
							label: 'Option 2',
							value: 'option-2',
						},
					]}
				/>
				<SelectField
					form={form}
					name="keywords"
					placeholder="Busque por palavras chaves (pode adicionar mais de um)"
					label="Público-alvo da tecnologia"
					isMulti
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={[
						{
							label: 'Option 1',
							value: 'option-1',
						},
						{
							label: 'Option 2',
							value: 'option-2',
						},
					]}
				/>
			</Column>
			<Column>
				<SelectField
					form={form}
					name="stage"
					placeholder="Escolha o estágio TRL"
					label="Em qual estágio de maturidade está a sua tecnologia?"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={[
						{
							label: 'Option 1',
							value: 'option-1',
						},
						{
							label: 'Option 2',
							value: 'option-2',
						},
					]}
				/>
				<SwitchField form={form} name="copyright" label="Tem patente?" />
				<SelectField
					form={form}
					name="rights"
					placeholder="Escolha a proteção intelectual"
					label="Proteção Intelectual da tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={[
						{
							label: 'Option 1',
							value: 'option-1',
						},
						{
							label: 'Option 2',
							value: 'option-2',
						},
					]}
				/>
				<SelectField
					form={form}
					name="classification"
					placeholder="Escolha a classificação"
					label="Classifique a tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={[
						{
							label: 'Option 1',
							value: 'option-1',
						},
						{
							label: 'Option 2',
							value: 'option-2',
						},
					]}
				/>
				<SelectField
					form={form}
					name="classification"
					placeholder="Escolha a dimensão"
					label="Dimensão da tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={[
						{
							label: 'Option 1',
							value: 'option-1',
						},
						{
							label: 'Option 2',
							value: 'option-2',
						},
					]}
				/>

				<SelectField
					form={form}
					name="category"
					placeholder="Escolha a categoria"
					label="Escolha a categoria"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={[
						{
							label: 'Option 1',
							value: 'option-1',
						},
						{
							label: 'Option 2',
							value: 'option-2',
						},
					]}
				/>
				<SelectField
					form={form}
					name="subcategory"
					placeholder="Escolha a sub categoria"
					label="Escolha a subcategoria"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={[
						{
							label: 'Option 1',
							value: 'option-1',
						},
						{
							label: 'Option 2',
							value: 'option-2',
						},
					]}
				/>
			</Column>
		</ColumnCotainer>
	);
};

AboutTechnology.propTypes = {
	// we don't care about the shape of the form, we just forward it
	form: PropTypes.shape({}),
};

AboutTechnology.defaultProps = {
	form: {},
};

export default AboutTechnology;
