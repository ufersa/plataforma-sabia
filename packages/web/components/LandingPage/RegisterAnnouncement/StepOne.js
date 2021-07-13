import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { getInstitutions } from '../../../services';
import { getInstitutionLabel } from '../../../utils/helper';
import { InputField, SelectField, TextField } from '../../Form';
import { inputWrapperCss } from './styles';
import { useAuth } from '../../../hooks';

const StepOne = ({ form }) => {
	const { isAuthenticated } = useAuth();

	const { data: { data: institutions } = {}, isValidating: isValidatingInstitutions } = useSWR(
		isAuthenticated ? 'get-institutions' : null,
		() => getInstitutions({ perPage: 50, order: 'desc' }),
		{
			revalidateOnFocus: false,
		},
	);

	return (
		<>
			<SelectField
				form={form}
				isSearchable
				name="institution_id"
				label="Organização"
				placeholder="Escolha a organização"
				isLoading={isValidatingInstitutions}
				options={institutions?.map((institution) => ({
					label: getInstitutionLabel(institution),
					value: institution.id,
				}))}
				variant="rounded"
				validation={{ required: true }}
			/>
			<InputField
				form={form}
				name="title"
				type="text"
				label="Título"
				validation={{ required: true }}
				variant="gray"
				wrapperCss={inputWrapperCss}
			/>
			<TextField
				form={form}
				name="description"
				label="Descritivo"
				validation={{ required: true }}
				variant="gray"
				wrapperCss={inputWrapperCss}
			/>
		</>
	);
};

StepOne.propTypes = {
	form: PropTypes.shape({}),
};

StepOne.defaultProps = {
	form: {},
};

export default StepOne;
