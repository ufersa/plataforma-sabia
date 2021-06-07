import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import useSWR, { mutate } from 'swr';
import Select from 'react-select';
import { FaPlus as PlusIcon } from 'react-icons/fa';

import { CheckBoxField } from '../../Form';
import Loading from '../../Loading';
import { toast } from '../../Toast';
import { getTaxonomyTerms, requestToBeReviewer } from '../../../services';
import { theme } from '../../../styles';
import { mapArrayOfObjectToSelect } from '../../../utils/helper';
import { useAuth, useModal } from '../../../hooks';
import { internal as internalPages } from '../../../utils/consts/pages';
import * as S from './styles';

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

const BeAReviewerModal = ({ closeModal }) => {
	const { user } = useAuth();
	const [subCategories, setSubCategories] = useState([]);
	const [categoryValue, setCategoryValue] = useState(null);
	const [subCategoryValue, setSubCategoryValue] = useState(null);
	const [selectedValues, setSelectedValues] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { openModal } = useModal();
	const [acceptedTerms, setAcceptedTerms] = useState({
		availability: false,
		conflicts: false,
		ethics: false,
	});

	const { data: taxonomiesCategories = [], isValidating } = useSWR(
		'get-taxonomies-terms',
		() => getTaxonomyTerms('category', { parent: null }),
		{
			revalidateOnFocus: false,
		},
	);

	useEffect(() => {
		if (categoryValue) {
			getTaxonomyTerms('category', { parent: categoryValue.value }).then((subcategories) => {
				setSubCategories(subcategories);
				setSubCategoryValue(null);
			});
		}
	}, [categoryValue]);

	const handleAcceptedTerms = (type) => {
		const types = Object.keys(acceptedTerms);

		if (!type || !types.some((item) => item === type)) {
			return null;
		}

		return setAcceptedTerms({
			...acceptedTerms,
			[type]: !acceptedTerms[type],
		});
	};

	/**
	 * Adds category and sub-category to list
	 * It does nothing if combination of category + sub-category already exists on list
	 *
	 * @returns {void}
	 */
	const handleAddCategory = () => {
		const alreadyExists = selectedValues.some(
			(selectedValue) =>
				selectedValue.category.label === categoryValue.label &&
				selectedValue.subCategory?.label === subCategoryValue?.label,
		);

		if (!alreadyExists) {
			setSelectedValues((prevState) => [
				...prevState,
				{ category: categoryValue, subCategory: subCategoryValue },
			]);
		}
	};

	/**
	 * Removes category and sub-category from selected list
	 * It compares provided object with selectedValues
	 * excluding from results those which match category and sub-category
	 *
	 * @param {object} selected The object containing category and sub-category
	 * @returns {void}
	 */
	const handleRemoveSelected = (selected) => {
		const newSelectedValues = selectedValues.filter(
			(selectedValue) =>
				!(
					selectedValue.category.label === selected.category.label &&
					selectedValue.subCategory?.label === selected.subCategory?.label
				),
		);

		setSelectedValues(newSelectedValues);
	};

	/**
	 * Creates an array with categories and sub-categories ID
	 * Submit it to the api with user_id
	 *
	 * @param {object} e The submit event
	 * @returns {void}
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const categories = selectedValues.reduce((acc, curr) => {
			acc.push(curr.category.value);
			if (curr.subCategory) {
				acc.push(curr.subCategory.value);
			}
			return acc;
		}, []);

		const reviewer = await requestToBeReviewer(user.id, { categories });

		if (reviewer) {
			closeModal();
			openModal('requestToBeReviewerSent');
			toast.success('Solicitação enviada com sucesso');
		} else {
			toast.error('Ocorreu um erro, recarregue a página e tente novamente');
		}

		// Invalidate reviewer request
		mutate('get-current-reviewer');

		setIsSubmitting(false);
	};

	/**
	 * Disable add button when:
	 * 1 - Category Select is empty
	 * 2 - Sub-category Select is empty if there's sub-categories to choose;
	 * 3 - Form is submitting
	 */
	const addBtnDisabled =
		!categoryValue ||
		(categoryValue && !!subCategories.length && !subCategoryValue) ||
		isSubmitting;

	return (
		<S.Modal onSubmit={handleSubmit}>
			<S.InfosContainer>
				<img
					src="/windows-rafiki.svg"
					alt="Rapaz em pé apontando com a mão para janelas representando aplicações de um sistema operacional"
				/>

				<S.Title>
					<p>Que bom poder contar contigo</p>
					<span>
						O <b>curador</b> tem a responsabilidade de analisar previamente os novos
						cadastros de tecnologias que tenham afinidade com sua área de pesquisa e
						conhecimento, e assim, sugerir alterações e emitir parecer favorável ou não
						à publicação dessas tecnologias na <b>Plataforma Sabiá</b>. Para que o
						cadastro do curador seja aprovado é necessário conhecermos qual a sua{' '}
						<b>área de atuação</b> escolhendo-as nas opções abaixo.
					</span>
				</S.Title>
			</S.InfosContainer>

			<Loading loading={isValidating}>
				<S.InputsWrapper>
					<S.FieldWrapper required>
						<S.FieldLabel htmlFor="react-select-reviewer-categories-input">
							Área de atuação
						</S.FieldLabel>
						<Select
							instanceId="reviewer-categories"
							styles={customSelectStyles}
							noOptionsMessage={() => 'Nenhuma categoria disponível'}
							placeholder="Selecione a área"
							options={mapArrayOfObjectToSelect(taxonomiesCategories, 'term', 'id')}
							value={categoryValue}
							onChange={setCategoryValue}
						/>
					</S.FieldWrapper>

					<S.FieldWrapper
						isDisabled={!subCategories.length}
						required={subCategories.length}
					>
						<S.FieldLabel htmlFor="react-select-reviewer-sub-categories-input">
							Subárea de atuação
						</S.FieldLabel>
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
					</S.FieldWrapper>

					<S.Button
						variant="outlined"
						disabled={addBtnDisabled}
						onClick={handleAddCategory}
						type="button"
					>
						<PlusIcon />
						Adicionar
					</S.Button>
				</S.InputsWrapper>
			</Loading>

			<S.SelectedValuesWrapper>
				{selectedValues.map((item) => (
					<div key={`${item.category.value}_${item.subCategory?.value}`}>
						<span>
							<b>{item.category.label}</b>
						</span>
						{!!item.subCategory && <span> - {item.subCategory?.label}</span>}
						<S.Button
							variant="text"
							onClick={() => handleRemoveSelected(item)}
							type="button"
						>
							Remover
						</S.Button>
					</div>
				))}
			</S.SelectedValuesWrapper>

			<CheckBoxField
				data-testid="availability"
				name="availability"
				value={acceptedTerms.availability}
				onChange={() => handleAcceptedTerms('availability')}
				label={
					<span>
						Declaro estar disponível para avaliar as informações cadastradas pelos
						usuários no cadastro de tecnologias, checar sua coerência e consistência,
						bem como analisar o nível das tecnologias cadastradas na Plataforma Sabiá,
						desde que estejam dentro da minha área de especialidade.
					</span>
				}
				required
			/>
			<CheckBoxField
				data-testid="conflicts"
				name="conflicts"
				value={acceptedTerms.conflicts}
				onChange={() => handleAcceptedTerms('conflicts')}
				label={
					<span>
						Declaro que NÃO POSSUO conflito de interesses de ordens financeira,
						comercial, política, acadêmica e pessoal com as tecnologias pelas quais irei
						avaliar.
					</span>
				}
				required
			/>
			<CheckBoxField
				data-testid="ethics"
				name="ethics"
				value={acceptedTerms.ethics}
				onChange={() => handleAcceptedTerms('ethics')}
				label={
					<span>
						Declaro que irei atender aos princípios éticos no uso da Plataforma Sabiá e
						desempenharei as minhas funções com probidade, boa-fé e de acordo com a
						legislação vigente, sendo inteiramente responsável pelas condutas lesivas a
						direitos de terceiros, ao próprio serviço disponibilizado pela plataforma e
						à Administração Pública, com responsabilização civil contratual e/ou
						extracontratual, e adoção das medidas penais aplicáveis ao caso, conforme os{' '}
						<Link href={internalPages.termsOfUse}>
							<a target="_blank" rel="noreferrer">
								Termos e Condições de Uso
							</a>
						</Link>
						.
					</span>
				}
				required
			/>

			<S.Button
				disabled={
					!selectedValues.length ||
					!Object.values(acceptedTerms).every((value) => value === true)
				}
				type="submit"
			>
				Enviar solicitação
			</S.Button>
		</S.Modal>
	);
};

BeAReviewerModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default BeAReviewerModal;
