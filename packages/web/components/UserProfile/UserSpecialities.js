import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { SelectField } from '../Form';
import { Cell, Row } from '../Common';
import { getCNPQAreas } from '../../services';
import { mapArrayOfObjectToSelect } from '../../utils/helper';

const UserSpecialities = ({ form }) => {
	const { watch, setValue } = form;
	const {
		'knowledge_area_id[0]': greatArea,
		'knowledge_area_id[1]': area,
		'knowledge_area_id[2]': subArea,
	} = watch(['knowledge_area_id[0]', 'knowledge_area_id[1]', 'knowledge_area_id[2]']);

	const { data: greatAreas = [], isValidating: isValidatingGreatAreas } = useSWR(
		() => 'get-greatareas',
		() => getCNPQAreas(null, { level: 1 }),
		{
			revalidateOnFocus: false,
		},
	);

	const { data: rawAreas = [], isValidating: isValidatingAreas } = useSWR(
		() => `get-area-from-${greatArea.value}`,
		() => getCNPQAreas(null, { level: 2, greatArea: greatArea.value }),
		{
			revalidateOnFocus: false,
		},
	);

	const { data: rawSubAreas = [], isValidating: isValidatingSubAreas } = useSWR(
		() => `get-subarea-from-${area.value}`,
		() => getCNPQAreas(null, { level: 3, area: area.value }),
		{
			revalidateOnFocus: false,
		},
	);

	const { data: rawSpecialities = [], isValidating: isValidatingSpecialities } = useSWR(
		() => `get-specialities-from-${subArea.value}`,
		() => getCNPQAreas(null, { level: 4, subArea: subArea.value }),
		{
			revalidateOnFocus: false,
		},
	);

	return (
		<Row>
			<Cell col={1}>
				<SelectField
					form={form}
					name="knowledge_area_id[0]"
					placeholder="Escolha a grande área da tecnologia"
					label="Grande área da Tecnologia"
					validation={{ required: true }}
					options={mapArrayOfObjectToSelect(greatAreas, 'name', 'knowledge_area_id')}
					isLoading={isValidatingGreatAreas}
					onChange={([selectedOption]) => {
						setValue('knowledge_area_id[1]', null);
						setValue('knowledge_area_id[2]', null);
						setValue('knowledge_area_id[3]', null);
						return selectedOption;
					}}
				/>

				<SelectField
					form={form}
					name="knowledge_area_id[1]"
					placeholder="Escolha a área da tecnologia"
					label="Área"
					options={mapArrayOfObjectToSelect(rawAreas, 'name', 'knowledge_area_id')}
					isHidden={!greatArea || !rawAreas?.length}
					isLoading={isValidatingAreas}
					onChange={([selectedOption]) => {
						setValue('knowledge_area_id[2]', null);
						setValue('knowledge_area_id[3]', null);

						return selectedOption;
					}}
				/>

				<SelectField
					form={form}
					name="knowledge_area_id[2]"
					placeholder="Escolha a sub-área da tecnologia"
					label="Sub-área"
					options={mapArrayOfObjectToSelect(rawSubAreas, 'name', 'knowledge_area_id')}
					isHidden={!area || !rawSubAreas?.length}
					isLoading={isValidatingSubAreas}
					onChange={([selectedOption]) => {
						setValue('knowledge_area_id[3]', null);

						return selectedOption;
					}}
				/>

				<SelectField
					form={form}
					name="knowledge_area_id[3]"
					placeholder="Escolha a especialidade da tecnologia"
					label="Especialidade"
					options={mapArrayOfObjectToSelect(rawSpecialities, 'name', 'knowledge_area_id')}
					isHidden={!subArea || !rawSpecialities?.length}
					isLoading={isValidatingSpecialities}
				/>
			</Cell>
		</Row>
	);
};

UserSpecialities.propTypes = {
	form: PropTypes.shape({
		watch: PropTypes.func,
		setValue: PropTypes.func,
	}),
};

UserSpecialities.defaultProps = {
	form: {},
};

export default UserSpecialities;
