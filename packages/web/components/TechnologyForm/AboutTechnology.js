import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputField, TextField, SelectField, SwitchField } from '../Form';
import { ColumnContainer, Column } from '../Common';
import { mapArrayOfObjectToSelect } from '../../utils/helper';
import { getTaxonomyTerms } from '../../services';

const getTermDefaultValue = (taxonomyId, terms, options = {}) => {
	if (!terms) {
		return null;
	}

	const filteredTerms = terms.filter((term) => {
		const belongsToTax = term.taxonomy_id === taxonomyId;
		const isParent = term.parent_id == null;
		const isChild = term.parent_id > 0;

		if (options.onlyParent) {
			return belongsToTax && isParent;
		}
		if (options.onlyChildren) {
			return belongsToTax && isChild;
		}

		return belongsToTax;
	});

	return mapArrayOfObjectToSelect(filteredTerms, 'term', 'id');
};

const AboutTechnology = ({ form, initialValues }) => {
	const { watch, getValues, setValue } = form;
	const hasCategory = watch('terms.primarycategory');
	const [subCategories, setSubCategories] = useState([]);
	const { technology } = initialValues;

	useEffect(() => {
		if (hasCategory) {
			const values = getValues();

			getTaxonomyTerms('category', { parent: values['terms.primarycategory'].value }).then(
				(data) => {
					setValue('subcategory', null);
					setSubCategories(data);
				},
			);
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
					defaultValue={technology.title}
					help={<p>Este é o título da sua tecnologia</p>}
				/>
				<TextField
					form={form}
					name="description"
					label="Descrição da Tecnologia"
					placeholder="Descreva resumidamente a tecnologia"
					validation={{ required: true }}
					defaultValue={technology.description}
					help={<p>Help Text</p>}
				/>
				<SelectField
					form={form}
					name="terms.target_audience"
					placeholder="Escolha pelo menos um"
					label="Público-alvo da tecnologia"
					isMulti
					validation={{ required: true }}
					help={<p>Help Text</p>}
					defaultValue={getTermDefaultValue(
						initialValues.taxonomies?.target_audience.id,
						technology.terms,
					)}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.target_audience?.terms,
						'term',
						'id',
					)}
				/>
				<SelectField
					form={form}
					name="terms.biome"
					placeholder="Escolha um termo"
					label="Bioma Principal da Tecnologia"
					help={<p>Help Text</p>}
					validation={{ required: true }}
					defaultValue={getTermDefaultValue(
						initialValues.taxonomies?.biome.id,
						technology.terms,
					)}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.biome?.terms,
						'term',
						'id',
					)}
				/>
				<SelectField
					form={form}
					name="terms.government_program"
					placeholder="Busque por um programa de governo (pode adicionar mais de um)"
					label="Programa de Governo"
					isMulti
					validation={{ required: true }}
					help={<p>Help Text</p>}
					defaultValue={getTermDefaultValue(
						initialValues.taxonomies?.government_program.id,
						technology.terms,
					)}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.government_program?.terms,
						'term',
						'id',
					)}
				/>
				<SelectField
					form={form}
					name="terms.keywords"
					placeholder="Busque por palavras chaves (pode adicionar mais de um)"
					label="Palavras-chave"
					isMulti
					validation={{ required: true }}
					help={<p>Help Text</p>}
					defaultValue={getTermDefaultValue(
						initialValues.taxonomies?.keywords.id,
						technology.terms,
					)}
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
					name="terms.stage"
					placeholder="Escolha o estágio TRL"
					label="Em qual estágio de maturidade está a sua tecnologia?"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					defaultValue={getTermDefaultValue(
						initialValues.taxonomies?.stage.id,
						technology.terms,
					)}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.stage?.terms,
						'term',
						'id',
					)}
				/>
				<SwitchField form={form} name="patent" label="Tem patente?" />
				<SelectField
					form={form}
					name="terms.intellectual_property"
					placeholder="Escolha a proteção intelectual"
					label="Proteção Intelectual da tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					defaultValue={getTermDefaultValue(
						initialValues.taxonomies?.intellectual_property.id,
						technology.terms,
					)}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.intellectual_property?.terms,
						'term',
						'id',
					)}
				/>
				<SelectField
					form={form}
					name="terms.classification"
					placeholder="Escolha a classificação"
					label="Classifique sua tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					defaultValue={getTermDefaultValue(
						initialValues.taxonomies?.classification.id,
						technology.terms,
					)}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.classification?.terms,
						'term',
						'id',
					)}
				/>
				<SelectField
					form={form}
					name="terms.dimension"
					placeholder="Escolha a dimensão"
					label="Dimensão da tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					defaultValue={getTermDefaultValue(
						initialValues.taxonomies?.dimension.id,
						technology.terms,
					)}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.dimension?.terms,
						'term',
						'id',
					)}
				/>

				<SelectField
					form={form}
					name="terms.primarycategory"
					placeholder="Escolha a categoria"
					label="Categoria da Tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					defaultValue={getTermDefaultValue(
						initialValues.taxonomies?.category.id,
						technology.terms,
						{ onlyParent: true },
					)}
					options={mapArrayOfObjectToSelect(
						initialValues.taxonomies?.category?.terms,
						'term',
						'id',
					)}
				/>

				<SelectField
					form={form}
					name="terms.subcategory"
					placeholder={
						subCategories.length > 0
							? 'Escolha a sub categoria'
							: 'Escolha uma categoria primeiro'
					}
					label="Sub-Categoria"
					validation={{ required: true }}
					help={<p>Help Text</p>}
					defaultValue={getTermDefaultValue(
						initialValues.taxonomies?.category.id,
						technology.terms,
						{ onlyChildren: true },
					)}
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
		technology: PropTypes.shape({
			title: PropTypes.string,
			description: PropTypes.string,
			terms: PropTypes.arrayOf(PropTypes.shape({})),
		}),
	}).isRequired,
};

AboutTechnology.defaultProps = {
	form: {},
};

export default AboutTechnology;
