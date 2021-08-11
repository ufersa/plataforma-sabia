import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { SelectField } from '../Form';
import { Cell, Row } from '../Common';
import { getCNPQAreas } from '../../services';
import { mapArrayOfObjectToSelect } from '../../utils/helper';

const UserSpecialities = ({ form, selected, index, onFinishInitialLoading }) => {
	const [isFirstMount, setIsFirstMount] = useState(true);
	const { watch, setValue } = form;
	const areaKeyToWatch = `knowledge_area.${index}`;
	const areaKeyMapping = [...Array(4).keys()].map((key) => `${areaKeyToWatch}.${key}`);
	const swrOptions = {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshWhenOffline: false,
		refreshWhenHidden: false,
		refreshInterval: 0,
	};

	const {
		[areaKeyMapping[0]]: greatArea,
		[areaKeyMapping[1]]: area,
		[areaKeyMapping[2]]: subArea,
		// eslint-disable-next-line no-unused-vars
		[areaKeyMapping[3]]: speciality,
	} = watch(areaKeyMapping);

	const { data: greatAreas = [], isValidating: isValidatingGreatAreas } = useSWR(
		() => 'get-greatareas',
		() => getCNPQAreas(null, { level: 1 }),
		swrOptions,
	);

	const { data: rawAreas = [], isValidating: isValidatingAreas } = useSWR(
		() => `get-area-from-${greatArea.value}`,
		() => getCNPQAreas(null, { level: 2, greatArea: greatArea.value }),
		swrOptions,
	);

	const { data: rawSubAreas = [], isValidating: isValidatingSubAreas } = useSWR(
		() => `get-subarea-from-${area.value}`,
		() => getCNPQAreas(null, { level: 3, area: area.value }),
		swrOptions,
	);

	const { data: rawSpecialities = [], isValidating: isValidatingSpecialities } = useSWR(
		() => `get-specialities-from-${subArea.value}`,
		() => getCNPQAreas(null, { level: 4, subArea: subArea.value }),
		swrOptions,
	);

	useEffect(() => {
		const hasSelectedProperties = !!Object.values(selected);

		if (hasSelectedProperties && isFirstMount) {
			const fieldsMapping = {
				great_area_id: {
					validated: !isValidatingGreatAreas,
					dataLength: greatAreas.length,
				},
				area_id: {
					validated: !isValidatingAreas,
					dataLength: rawAreas.length,
				},
				sub_area_id: {
					validated: !isValidatingSubAreas,
					dataLength: rawSubAreas.length,
				},
				speciality_id: {
					validated: !isValidatingSpecialities,
					dataLength: rawSpecialities.length,
				},
			};

			const fieldsToCheck = Object.keys(fieldsMapping)
				.map((key) => (selected[key] ? key : null))
				.filter(Boolean);

			const isAlreadyLoaded = fieldsToCheck.every((validate) => {
				return Object.values(fieldsMapping[validate]).every((value) => value);
			});

			if (isAlreadyLoaded) {
				onFinishInitialLoading(true);
				setIsFirstMount(false);
			}
		}
	}, [
		greatAreas,
		isFirstMount,
		isValidatingAreas,
		isValidatingGreatAreas,
		isValidatingSpecialities,
		isValidatingSubAreas,
		onFinishInitialLoading,
		rawAreas,
		rawSpecialities,
		rawSubAreas,
		selected,
	]);

	return (
		<Row>
			<Cell col={1}>
				<Cell col={1}>
					<SelectField
						form={form}
						name={areaKeyMapping[0]}
						placeholder="Escolha a grande área"
						label="Grande área"
						validation={{ required: true }}
						options={mapArrayOfObjectToSelect(greatAreas, 'name', 'knowledge_area_id')}
						isLoading={isValidatingGreatAreas}
						defaultValue={selected?.great_area_id}
						onChange={(selectedOption) => {
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
						defaultValue={selected?.area_id}
						onChange={(selectedOption) => {
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
						defaultValue={selected?.sub_area_id}
						onChange={(selectedOption) => {
							setValue(areaKeyMapping[3], null);
							return selectedOption;
						}}
					/>

					<SelectField
						form={form}
						name={areaKeyMapping[3]}
						placeholder="Escolha a especialidade"
						label="Especialidade"
						options={mapArrayOfObjectToSelect(
							rawSpecialities,
							'name',
							'knowledge_area_id',
						)}
						defaultValue={selected?.speciality_id}
						isHidden={!subArea || !rawSpecialities?.length}
						isLoading={isValidatingSpecialities}
					/>
				</Cell>
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
	onFinishInitialLoading: PropTypes.func,
};

UserSpecialities.defaultProps = {
	form: {},
	selected: {},
	index: 0,
	onFinishInitialLoading: () => {},
};

export default UserSpecialities;
