import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputField, TextField, SelectField, SwitchField } from '../Form';
import { ColumnContainer, Column } from '../Common';
import { mapArrayOfObjectToSelect } from '../../utils/helper';
import { getTaxonomyTerms } from '../../services';

const AboutTechnology = ({ form, initialValues }) => {
	const { watch, getValues, setValue } = form;
	const hasCategory = watch('category');
	const [subCategories, setSubCategories] = useState([]);

	useEffect(() => {
		if (hasCategory) {
			const { category } = getValues();
			getTaxonomyTerms('category', { parent: category.value }).then((data) => {
				setValue('subcategory', null);
				setSubCategories(data);
			});
		}
	}, [hasCategory, getValues, setValue]);

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
						'id',
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
						'id',
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
						'id',
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
						'id',
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
						'id',
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
						'id',
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
						'id',
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
						'id',
					)}
				/>

				<SelectField
					form={form}
					name="category"
					placeholder="Escolha a categoria"
					label="Categoria da Tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.category?.terms,
						'term',
						'id',
					)}
				/>

				<SelectField
					form={form}
					name="subcategory"
					placeholder={
						subCategories.length > 0
							? 'Escolha a sub categoria'
							: 'Escolha uma categoria primeiro'
					}
					label="Sub-Categoria"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					options={mapArrayOfObjectToSelect(subCategories, 'term', 'id')}
				/>
			</Column>
		</ColumnContainer>
	);
};

AboutTechnology.propTypes = {
	form: PropTypes.shape({
		watch: PropTypes.func,
		getValues: PropTypes.func,
		setValue: PropTypes.func,
	}),
	initialValues: PropTypes.shape({
		taxonomies: PropTypes.shape({}),
	}).isRequired,
};

AboutTechnology.defaultProps = {
	form: {},
};

export default AboutTechnology;
