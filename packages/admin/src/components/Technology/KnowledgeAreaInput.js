import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Loading,
	Error,
	useDataProvider,
	useQuery,
	SelectInput,
	FormDataConsumer,
} from 'react-admin';

const KnowledgeAreaInput = ({ record }) => {
	let areaIds = {
		greatArea: record.knowledgeArea.great_area_id,
		area: record.knowledgeArea.area_id,
		subArea: record.knowledgeArea.sub_area_id,
		speciality: record.knowledgeArea.speciality_id,
	};
	let setAreaIds = () => {};

	const dataProvider = useDataProvider();
	const greatAreas = useQuery({
		type: 'getList',
		resource: 'areas',
		payload: {
			pagination: {
				page: 1,
				perPage: 100,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
			filter: { level: 1 },
		},
	});

	const currentArea = useQuery({
		type: 'getList',
		resource: 'areas',
		payload: {
			pagination: {
				page: 1,
				perPage: 100,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
			filter: { level: 2, greatArea: record.knowledgeArea.great_area_id },
		},
	});

	const currentSubArea = useQuery({
		type: 'getList',
		resource: 'areas',
		payload: {
			pagination: {
				page: 1,
				perPage: 100,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
			filter: { level: 3, area: record.knowledgeArea.area_id },
		},
	});

	const currentSpeciality = useQuery({
		type: 'getList',
		resource: 'areas',
		payload: {
			pagination: {
				page: 1,
				perPage: 100,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
			filter: { level: 4, subArea: record.knowledgeArea.sub_area_id },
		},
	});

	const [areaData, setAreaData] = useState(false);
	[areaIds, setAreaIds] = useState(areaIds);

	if (
		[
			greatAreas.loading,
			currentArea.loading,
			currentSubArea.loading,
			currentSpeciality.loading,
		].includes(true)
	) {
		return <Loading />;
	}

	if (greatAreas.error) return <Error />;

	if (!areaData) {
		setAreaData({
			greatAreas: greatAreas?.data,
			area: currentArea?.data,
			subArea: currentSubArea?.data,
			speciality: currentSpeciality?.data,
		});
	}

	const getAPI = (type, payload = {}) => {
		setAreaIds({ ...payload, [type]: true });
		const url = 'areas';
		dataProvider
			.getList(url, {
				pagination: {
					page: 1,
					perPage: 100,
				},
				sort: {
					field: 'id',
					order: 'asc',
				},
				filter: payload,
			})
			.then(({ data }) => {
				setAreaData({ ...areaData, [type]: data });
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.log(error);
			});
	};

	return (
		<span>
			<SelectInput
				source="greatArea"
				fullWidth
				choices={greatAreas.data}
				parse={(value) => {
					getAPI('area', {
						level: 2,
						greatArea: value,
						area: null,
						subArea: null,
						speciality: null,
					});
					return value;
				}}
				format={(value) => {
					return value || areaIds.greatArea;
				}}
			/>
			{areaIds.area && (
				<SelectInput
					source="area"
					fullWidth
					choices={areaData.area || []}
					parse={(value) => {
						getAPI('subArea', {
							...areaIds,
							level: 3,
							area: value,
							subArea: null,
							speciality: null,
						});
						return value;
					}}
					format={(value) => {
						return value || areaIds.area;
					}}
				/>
			)}
			{areaIds.subArea && (
				<SelectInput
					source="subArea"
					fullWidth
					choices={areaData.subArea || []}
					parse={(value) => {
						getAPI('speciality', {
							...areaIds,
							level: 4,
							subArea: value,
							speciality: null,
						});
						return value;
					}}
					format={(value) => {
						return value || areaIds.subArea;
					}}
				/>
			)}
			{areaIds.speciality && (
				<SelectInput
					source="speciality"
					fullWidth
					choices={areaData.speciality || []}
					parse={(value) => {
						setAreaIds({ ...areaIds, speciality: value });
						return value;
					}}
					format={(value) => {
						return value || areaIds.speciality;
					}}
				/>
			)}
			<FormDataConsumer>
				{({ formData }) => {
					const is_valid = (num) => {
						const result = Number.isInteger(num) ? num : false;
						return result;
					};

					if (is_valid(areaIds.greatArea)) {
						let id = areaIds.greatArea;
						if (is_valid(areaIds.area)) {
							id = areaIds.area;
							if (is_valid(areaIds.subArea)) {
								id = areaIds.subArea;
								if (is_valid(areaIds.speciality)) {
									id = areaIds.speciality;
								}
							}
						}
						formData.knowledge_area_id = id;
					}
				}}
			</FormDataConsumer>
		</span>
	);
};

KnowledgeAreaInput.propTypes = {
	record: PropTypes.shape(),
};

KnowledgeAreaInput.defaultProps = {
	record: {},
};
export default KnowledgeAreaInput;
