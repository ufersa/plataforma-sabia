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
		'knowledge_area[0]': greatArea,
		'knowledge_area[1]': area,
		'knowledge_area[2]': subArea,
	} = watch(['knowledge_area[0]', 'knowledge_area[1]', 'knowledge_area[2]']);

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
					name="knowledge_area[0]"
					placeholder="Escolha a grande área"
					label="Grande área"
					validation={{ required: true }}
					options={mapArrayOfObjectToSelect(greatAreas, 'name', 'knowledge_area_id')}
					isLoading={isValidatingGreatAreas}
					onChange={([selectedOption]) => {
						setValue('knowledge_area[1]', null);
						setValue('knowledge_area[2]', null);
						setValue('knowledge_area[3]', null);
						return selectedOption;
					}}
				/>

				<SelectField
					form={form}
					name="knowledge_area[1]"
					placeholder="Escolha a área"
					label="Área"
					options={mapArrayOfObjectToSelect(rawAreas, 'name', 'knowledge_area_id')}
					isHidden={!greatArea || !rawAreas?.length}
					isLoading={isValidatingAreas}
					onChange={([selectedOption]) => {
						setValue('knowledge_area[2]', null);
						setValue('knowledge_area[3]', null);
						return selectedOption;
					}}
				/>

				<SelectField
					form={form}
					name="knowledge_area[2]"
					placeholder="Escolha a sub-área"
					label="Sub-área"
					options={mapArrayOfObjectToSelect(rawSubAreas, 'name', 'knowledge_area_id')}
					isHidden={!area || !rawSubAreas?.length}
					isLoading={isValidatingSubAreas}
					onChange={([selectedOption]) => {
						setValue('knowledge_area[3]', null);
						return selectedOption;
					}}
				/>

				<SelectField
					form={form}
					name="knowledge_area[3]"
					placeholder="Escolha a especialidade"
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
