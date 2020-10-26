import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { getTaxonomyTerms, updateCategoriesReviewer } from '../../services';
import { theme } from '../../styles';
import { mapArrayOfObjectToSelect } from '../../utils/helper';
import { toast } from '../Toast';

const customSelectStyles = {
	container: (base) => ({
		...base,
		width: '100%',
	}),
	control: (base) => ({
		...base,
		backgroundColor: theme.colors.lightGray4,
		borderRadius: `${theme.metrics.baseRadius}rem`,
		borderColor: theme.colors.lightGray4,
	}),
	indicatorSeparator: () => ({
		width: 0,
	}),
};

const CurateFormSpecialties = ({ defaultValues }) => {
	const router = useRouter();
	const [subCategories, setSubCategories] = useState([]);
	const [categoryValue, setCategoryValue] = useState(null);
	const [subCategoryValue, setSubCategoryValue] = useState(null);
	const [selectedValues, setSelectedValues] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: taxonomiesCategories = [] } = useSWR(
		'get-taxonomies-terms',
		() => getTaxonomyTerms('category', { parent: null }),
		{
			revalidateOnFocus: false,
		},
	);

	useEffect(() => {
		const normalizeCategories = defaultValues
			.filter((category) => category.parent_id !== null)
			.map((category) => {
				const categoryParent = defaultValues.find(
					(innerCategory) => innerCategory.id === category.parent_id,
				);
				const categoryParentLabel = categoryParent?.term;
				const categoryParentValue = categoryParent?.id.toString();
				return {
					category: {
						label: categoryParentLabel,
						value: categoryParentValue,
					},
					subCategory: {
						label: category.term,
						value: category.id.toString(),
					},
				};
			});

		setSelectedValues(normalizeCategories);
	}, [defaultValues]);

	useEffect(() => {
		if (categoryValue) {
			getTaxonomyTerms('category', { parent: categoryValue.value }).then((subcategories) => {
				setSubCategories(subcategories);
				setSubCategoryValue(null);
			});
		}
	}, [categoryValue]);

	useEffect(() => {
		if (categoryValue && subCategoryValue) {
			const alreadyExists = selectedValues.some(
				(selectedValue) =>
					selectedValue.category.value === categoryValue.value &&
					selectedValue.subCategory?.value === subCategoryValue?.value,
			);

			if (!alreadyExists) {
				setSelectedValues((prevState) => [
					...prevState,
					{ category: categoryValue, subCategory: subCategoryValue },
				]);
			}
		}
	}, [selectedValues, categoryValue, subCategoryValue]);

	const resetState = () => {
		setCategoryValue(null);
		setSubCategoryValue(null);
		setSubCategories([]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const specialties = selectedValues.reduce((acc, curr) => {
			if (curr.subCategory) {
				acc.push(curr.category.value);
				acc.push(curr.subCategory.value);
			}
			return acc;
		}, []);

		const reviewer = await updateCategoriesReviewer({
			categories: specialties,
		});

		if (reviewer) {
			resetState();
			router.push('/user/my-account/curate-profile');
			toast.success('Solicitação enviada com sucesso');
		} else {
			toast.error('Ocorreu um erro, recarregue a página e tente novamente');
		}

		// Invalidate reviewer request
		mutate('get-current-reviewer');

		setIsSubmitting(false);
	};

	const btnDisabled =
		!categoryValue ||
		(categoryValue && !!subCategories.length && !subCategoryValue) ||
		isSubmitting;

	return (
		<Container>
			<h3>Nova área de atuação</h3>
			<Form onSubmit={handleSubmit}>
				<InputWrapper>
					<Label>Área de atuação</Label>
					<Select
						instanceId="reviewer-categories"
						styles={customSelectStyles}
						noOptionsMessage={() => 'Nenhuma categoria disponível'}
						placeholder="Selecione a área"
						options={mapArrayOfObjectToSelect(taxonomiesCategories, 'term', 'id')}
						value={categoryValue}
						onChange={setCategoryValue}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label>Subarea de atuação</Label>
					<Select
						instanceId="reviewer-sub-categories"
						styles={customSelectStyles}
						noOptionsMessage={() => 'Nenhuma sub-área disponível'}
						placeholder={
							subCategories.length
								? 'Selecione a sub-área'
								: 'Nenhuma sub-área disponível'
						}
						isDisabled={!subCategories.length}
						options={mapArrayOfObjectToSelect(subCategories, 'term', 'id')}
						value={subCategoryValue}
						onChange={setSubCategoryValue}
					/>
				</InputWrapper>
				<Button variant="contained" disabled={btnDisabled} type="submit">
					{isSubmitting ? 'Salvando...' : 'Adicionar Área de Atuação'}
				</Button>
			</Form>
		</Container>
	);
};

CurateFormSpecialties.propTypes = {
	defaultValues: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const Container = styled.section`
	background-color: ${({ theme: { colors } }) => colors.white};
	border-radius: 5px;
	width: 100%;
	display: flex;
	padding: 16px;
	box-shadow: 2px 2px 8px ${({ theme: { colors } }) => colors.lightGray3};
	flex-direction: column;

	h3 {
		padding-bottom: 24px;
		color: ${({ theme: { colors } }) => colors.lightGray2};
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const InputWrapper = styled.section`
	display: flex;
	flex-direction: column;
	margin-bottom: 16px;
`;

const Label = styled.label`
	font-size: 16px;
	line-height: 24px;
	font-weight: 500;
	margin-bottom: 8px;
`;

const buttonModifiers = {
	contained: (colors) => css`
		background: ${colors.secondary};
		color: ${colors.white};
		padding: 0.4rem 0.8rem;

		:hover,
		:focus {
			background: ${colors.darkGreen};
		}

		:disabled {
			background: ${colors.darkGray2};
		}
	`,
	text: (colors) => css`
		background: none;
		color: ${colors.red};
		padding: 0.4rem 0.8rem;

		:hover,
		:focus {
			color: ${colors.white};
			background: ${colors.red};
		}
	`,
};

const Button = styled.button`
	${({ theme: { colors }, variant = 'contained' }) => css`
		width: 100%;
		display: flex;
		align-items: center;
		align-self: center;
		justify-content: center;
		border: none;
		outline: none;
		margin-top: 8px;

		text-transform: uppercase;
		font-weight: bold;
		font-size: 1.4rem;
		line-height: 2.4rem;

		:disabled {
			pointer-events: none;
			opacity: 0.5;
		}

		${buttonModifiers[variant](colors)};
	`}
`;

export default CurateFormSpecialties;
