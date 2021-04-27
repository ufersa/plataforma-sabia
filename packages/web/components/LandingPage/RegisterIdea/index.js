import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Form, InputField, SelectField, TextField } from '../../Form';
import Actions from './Actions';
import { toast } from '../../Toast';
import { useAuth, useModal } from '../../../hooks';
import { getTaxonomies, createTerm } from '../../../services';
import { createIdea } from '../../../services/ideas';
import { flattenSelectOptionsValue, mapArrayOfObjectToSelect } from '../../../utils/helper';

import * as S from './styles';

const RegisterIdea = () => {
	const { t } = useTranslation(['common']);
	const { user } = useAuth();
	const { openModal } = useModal();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [keywordsTerms, setKeywordsTerms] = useState([]);

	useEffect(() => {
		const fetchTerms = async () => {
			const taxonomies = await getTaxonomies({ normalize: false });
			const keywordsTaxonomy = taxonomies?.find((tx) => tx.taxonomy === 'KEYWORDS');
			setKeywordsTerms(keywordsTaxonomy?.terms);
		};

		if (!keywordsTerms.length) {
			fetchTerms();
		}
	}, [keywordsTerms]);

	/**
	 * Handles submitting the form
	 *
	 * @param {object} data The form data.
	 * @param {object} form The form object.
	 * @returns {void}
	 */
	const handleSubmit = async ({ title, description, keywords }, form) => {
		const { reset, setValue } = form;
		setIsSubmitting(true);

		const { data, success } = await createIdea(
			title,
			description,
			flattenSelectOptionsValue(keywords),
		);

		if (success) {
			toast.success('Ideia enviada com sucesso!');
		} else {
			toast.error(
				data?.message
					? data?.message
					: 'Ocorreu um erro ao enviar a ideia, tente novamente.',
			);
		}

		setValue('description', '');
		setValue('keywords', null);
		reset();
		setIsSubmitting(false);
	};

	/**
	 * Handles creating a new term
	 *
	 * @param {string} inputValue The inserted input value.
	 * @param {string} taxonomy The taxonomy associated to the term
	 * @returns {Promise<object>} A promise that resolves to an object of shape { label, value }
	 */
	const onCreateTerm = async (inputValue, taxonomy) => {
		const term = await createTerm(inputValue, taxonomy);
		return { label: term.term, value: `${term.id}` };
	};

	/**
	 * Opens a modal to login or create a new user if there is no authenticated user
	 *
	 * @returns {void}
	 */
	const verifyAuthUser = () => {
		if (!user.email) {
			openModal('login', {
				message: t('common:signInToContinue'),
			});
		}
	};

	return (
		<S.Wrapper>
			<img
				src="sharing-Ideas-rafiki.svg"
				alt="Ilustração de um rapaz de camiseta verde entregando uma lâmpada gigante à outro rapaz de blusa preta com uma forma laranja ao fundo."
			/>
			<S.Container>
				<Form onSubmit={handleSubmit} onFocus={verifyAuthUser}>
					<S.StyledTitle align="left" noPadding noMargin>
						Conte sua ideia
					</S.StyledTitle>
					<InputField
						name="title"
						type="text"
						label="Titúlo da ideia"
						validation={{ required: true }}
						variant="gray"
					/>
					<TextField
						name="description"
						label="Detalhe da ideia"
						validation={{ required: true }}
						wrapperCss={S.inputWrapperCss}
						variant="gray"
					/>
					<SelectField
						name="keywords"
						placeholder="Adicione palavras-chave da sua ideia"
						label="Palavras-chave"
						isMulti
						creatable
						onCreate={(inputValue) => onCreateTerm(inputValue, 'KEYWORDS')}
						options={mapArrayOfObjectToSelect(keywordsTerms, 'term', 'id')}
						validation={{ required: true }}
						wrapperCss={S.inputWrapperCss}
					/>
					<Actions disableSubmit={isSubmitting} />
				</Form>
			</S.Container>
		</S.Wrapper>
	);
};

export default RegisterIdea;
