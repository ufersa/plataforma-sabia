import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import debounce from 'lodash.debounce';
import { getInstitutions } from '../../../services';
import { getInstitutionLabel } from '../../../utils/helper';
import { InputField, SelectField, TextField } from '../../Form';
import { inputWrapperCss } from './styles';
import { useAuth } from '../../../hooks';

const mapInstitutionsOptions = (institutions) =>
	institutions.map((institution) => ({
		label: getInstitutionLabel(institution),
		value: institution.id,
	}));

const StepOne = ({ form }) => {
	const { isAuthenticated } = useAuth();

	const { data: { data: institutions } = {} } = useSWR(
		isAuthenticated ? 'get-institutions' : null,
		() => getInstitutions({ perPage: 10, order: 'desc' }),
		{
			revalidateOnFocus: false,
		},
	);

	const handleFetchOptions = debounce((value, callback) => {
		getInstitutions({ filterBy: 'name', filter: value, order: 'desc' }).then((response) => {
			const mappedOptions = mapInstitutionsOptions(response.data);
			callback(mappedOptions);
		});
	}, 300);

	return (
		<>
			<SelectField
				form={form}
				name="institution_id"
				label="Organização"
				placeholder="Pesquise a organização"
				variant="rounded"
				validation={{ required: true }}
				isAsync
				cacheOptions
				defaultOptions={institutions ? mapInstitutionsOptions(institutions) : []}
				loadOptions={handleFetchOptions}
				loadingMessage={() => 'Carregando...'}
				noOptionsMessage={() => 'Nenhuma organização encontrada...'}
				instanceId="select-institutions-announcements"
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
