import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import {
	InputField,
	SelectField,
	CurrencyInputField,
	TextField,
	MaskedInputField,
} from '../../Form';
import { inputWrapperCss, DateTitle } from './styles';
import { createTerm, getTerms } from '../../../services';
import { mapArrayOfObjectToSelect } from '../../../utils/helper';
import { Row, Column } from '../../Common';
import { maskPatterns } from '../../../utils/masks';

const StepTwo = ({ form }) => {
	const { data: keywordsTerms, isValidating: isValidatingKeywords } = useSWR(
		'get-keywords-terms',
		() => getTerms({ taxonomy: 'KEYWORDS' }),
		{ revalidateOnFocus: false },
	);

	const { data: targetAudiencesTerms, isValidating: isValidatingTargetAudiences } = useSWR(
		'get-target-audiences',
		() => getTerms({ taxonomy: 'TARGET_AUDIENCE' }),
		{
			revalidateOnFocus: false,
		},
	);

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

	return (
		<>
			<Row grid gridGap="1.6rem" gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))">
				<Column noPadding>
					<InputField
						form={form}
						name="announcement_number"
						label="Número do Edital"
						variant="gray"
						validation={{ required: true }}
					/>
				</Column>
				<Column noPadding>
					<CurrencyInputField
						form={form}
						name="financial_resources"
						label="Recursos financeiros"
						variant="gray"
					/>
				</Column>
			</Row>

			<Row>
				<Column noPadding>
					<DateTitle>Período de inscrição</DateTitle>
					<Row
						grid
						gridGap="1.6rem"
						gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))"
					>
						<MaskedInputField
							form={form}
							name="start_date"
							label="Início"
							placeholder="dd/mm/aaaa"
							variant="rounded"
							pattern={maskPatterns.brazilianDate.pattern}
							mask={maskPatterns.brazilianDate.stringMask}
							validation={{ required: true }}
						/>
						<MaskedInputField
							form={form}
							name="end_date"
							label="Fim"
							placeholder="dd/mm/aaaa"
							variant="gray"
							pattern={maskPatterns.brazilianDate.pattern}
							mask={maskPatterns.brazilianDate.stringMask}
							validation={{ required: true }}
						/>
					</Row>
				</Column>
				<Column noPadding />
			</Row>

			<Row grid gridGap="1.6rem" gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))">
				<Column noPadding>
					<SelectField
						form={form}
						name="targetAudiences"
						label="Público alvo"
						placeholder="Adicione o público alvo do edital"
						options={mapArrayOfObjectToSelect(targetAudiencesTerms, 'term', 'id')}
						validation={{ required: true }}
						isLoading={isValidatingTargetAudiences}
						wrapperCss={inputWrapperCss}
						variant="rounded"
						isMulti
						isSearchable
					/>
				</Column>
				<Column noPadding>
					<SelectField
						form={form}
						name="keywords"
						placeholder="Adicione palavras-chave do edital"
						label="Palavras-chave"
						isMulti
						creatable
						onCreate={(inputValue) => onCreateTerm(inputValue, 'KEYWORDS')}
						options={mapArrayOfObjectToSelect(keywordsTerms, 'term', 'id')}
						validation={{ required: true }}
						isLoading={isValidatingKeywords}
						wrapperCss={inputWrapperCss}
						variant="rounded"
					/>
				</Column>
			</Row>

			<TextField
				form={form}
				name="comment"
				label="Observações"
				variant="gray"
				wrapperCss={inputWrapperCss}
			/>

			<InputField
				form={form}
				name="url"
				label="Link para o edital"
				placeholder="Insira o link para o edital"
				variant="rounded"
				validation={{ required: true }}
				wrapperCss={inputWrapperCss}
			/>
		</>
	);
};

StepTwo.propTypes = {
	form: PropTypes.shape({}).isRequired,
};

export default StepTwo;
