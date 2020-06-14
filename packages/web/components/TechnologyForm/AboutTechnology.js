import React from 'react';
import PropTypes from 'prop-types';
import { InputField, TextField, SelectField, SwitchField } from '../Form';
import { ColumnContainer, Column } from '../Common';
import { mapArrayOfObjectToSelect } from '../../utils/helper';

const AboutTechnology = ({ form, initialValues }) => {
	return (
		<ColumnContainer>
			<Column>
				<InputField
					form={form}
					name="title"
					label="Título da Tecnologia"
					placeholder="Insira o título da tecnologia"
					validation={{ required: true }}
					help={<p>Este é o título da sua tecnologia</p>}
				/>
				<TextField
					form={form}
					name="description"
					label="Descrição da Tecnologia"
					placeholder="Descreva resumidamente a tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<SelectField
					form={form}
					name="target_audience"
					placeholder="Escolha pelo menos um"
					label="Público-alvo da tecnologia"
					isMulti
					help={<p>Help Text</p>}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.target_audience?.terms,
						'term',
						'slug',
					)}
				/>
				<SelectField
					form={form}
					name="biome"
					placeholder="Escolha um termo"
					label="Bioma Principal da Tecnologia"
					help={<p>Help Text</p>}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.biome?.terms,
						'term',
						'slug',
					)}
				/>
				<SelectField
					form={form}
					name="government_program"
					placeholder="Busque por um programa de governo (pode adicionar mais de um)"
					label="Programa de Governo"
					isMulti
					help={<p>Help Text</p>}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.government_program?.terms,
						'term',
						'slug',
					)}
				/>
				<SelectField
					form={form}
					name="keywords"
					placeholder="Busque por palavras chaves (pode adicionar mais de um)"
					label="Palavras-chave"
					isMulti
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.keywords?.terms,
						'term',
						'slug',
					)}
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
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.stage?.terms,
						'term',
						'slug',
					)}
				/>
				<SwitchField form={form} name="patent" label="Tem patente?" />
				<SelectField
					form={form}
					name="intellectual_property"
					placeholder="Escolha a proteção intelectual"
					label="Proteção Intelectual da tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.intellectual_property?.terms,
						'term',
						'slug',
					)}
				/>
				<SelectField
					form={form}
					name="classification"
					placeholder="Escolha a classificação"
					label="Classifique sua tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.classification?.terms,
						'term',
						'slug',
					)}
				/>
				<SelectField
					form={form}
					name="dimension"
					placeholder="Escolha a dimensão"
					label="Dimensão da tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.dimension?.terms,
						'term',
						'slug',
					)}
				/>

				<SelectField
					form={form}
					name="category"
					placeholder="Escolha a categoria"
					label="Escolha a categoria"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.category?.terms,
						'term',
						'slug',
					)}
				/>
				<SelectField
					form={form}
					name="subcategory"
					placeholder="Escolha a sub categoria"
					label="Escolha a subcategoria"
					validation={{ required: false }}
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
		</ColumnContainer>
	);
};

AboutTechnology.propTypes = {
	// we don't care about the shape of the form, we just forward it
	form: PropTypes.shape({}),
	initialValues: PropTypes.shape({
		taxonomies: PropTypes.shape({}),
	}).isRequired,
};

AboutTechnology.defaultProps = {
	form: {},
};

export default AboutTechnology;
