import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { SelectField } from '../Form';
import { Cell, Row } from '../Common';
import { getCNPQAreas } from '../../services';
import { mapArrayOfObjectToSelect } from '../../utils/helper';

// eslint-disable-next-line no-unused-vars
const UserSpecialities = ({ form, selected, index }) => {
	const { watch, setValue } = form;
	const areaKeyToWatch = `knowledge_area[${index}]`;
	const areaKeyMapping = [...Array(4).keys()].map((key) => {
		return `${areaKeyToWatch}[${key}]`;
	});
	const {
		[areaKeyMapping[0]]: greatArea,
		[areaKeyMapping[1]]: area,
		[areaKeyMapping[2]]: subArea,
		// eslint-disable-next-line no-unused-vars
		[areaKeyMapping[3]]: specialities,
	} = watch(areaKeyMapping);

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
					name={areaKeyMapping[0]}
					placeholder="Escolha a grande área"
					label="Grande área"
					validation={{ required: true }}
					options={mapArrayOfObjectToSelect(greatAreas, 'name', 'knowledge_area_id')}
					isLoading={isValidatingGreatAreas}
					onChange={([selectedOption]) => {
						setValue(areaKeyMapping[1], null);
						setValue(areaKeyMapping[2], null);
						setValue(areaKeyMapping[3], null);
						return selectedOption;
					}}
				/>

				<SelectField
					form={form}
					name={areaKeyMapping[1]}
					placeholder="Escolha a área"
					label="Área"
					options={mapArrayOfObjectToSelect(rawAreas, 'name', 'knowledge_area_id')}
					isHidden={!greatArea || !rawAreas?.length}
					isLoading={isValidatingAreas}
					onChange={([selectedOption]) => {
						setValue(areaKeyMapping[2], null);
						setValue(areaKeyMapping[3], null);
						return selectedOption;
					}}
				/>

				<SelectField
					form={form}
					name={areaKeyMapping[2]}
					placeholder="Escolha a sub-área"
					label="Sub-área"
					options={mapArrayOfObjectToSelect(rawSubAreas, 'name', 'knowledge_area_id')}
					isHidden={!area || !rawSubAreas?.length}
					isLoading={isValidatingSubAreas}
					onChange={([selectedOption]) => {
						setValue(areaKeyMapping[3], null);
						return selectedOption;
					}}
				/>

				<SelectField
					form={form}
					name={areaKeyMapping[3]}
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
	selected: PropTypes.shape({
		knowledge_area_id: PropTypes.number,
		level: PropTypes.number,
		name: PropTypes.string,
		great_area_id: PropTypes.number,
		area_id: PropTypes.number,
		sub_area_id: PropTypes.number,
		speciality_id: PropTypes.number,
	}),
	index: PropTypes.number,
};

UserSpecialities.defaultProps = {
	form: {},
	selected: {},
	index: 0,
};

export default UserSpecialities;
