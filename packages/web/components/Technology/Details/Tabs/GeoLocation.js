import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import useTechnology from '../../../../hooks/useTechnology';
import * as Layout from '../../../Common/Layout';
import GoogleMaps, { getMarkerIconByTerm } from '../../../GoogleMaps';
import { LOCATIONS as technologyLocationsEnum } from '../../../../utils/enums/technology.enums';
import CheckBoxField from '../../../Form/CheckBoxField';
import { Protected } from '../../../Authorization';

const Geolocation = ({ stacked }) => {
	const { technology } = useTechnology();
	const [markerFilters, setMarkerFilters] = useState([
		technologyLocationsEnum.WHO_DEVELOP,
		technologyLocationsEnum.WHERE_CAN_BE_APPLIED,
		technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED,
	]);

	const handleMarkerFilterChange = (value) => {
		const previousMarkerFilters = [...markerFilters];
		const checkBoxIndex = previousMarkerFilters.findIndex((filter) => filter === value);
		if (checkBoxIndex === -1) {
			previousMarkerFilters.push(value);
		} else {
			previousMarkerFilters.splice(checkBoxIndex, 1);
		}

		setMarkerFilters(previousMarkerFilters);
	};

	const getMarkers = () => {
		const { locations = [] } = technology || {};

		if (!locations?.length) {
			return null;
		}

		return locations
			.filter((location) => markerFilters.includes(location.pivot.location_type))
			.map((location) => ({
				type: location.pivot.location_type,
				description: location.pivot.location_type,
				latitude: location.lat,
				longitude: location.lng,
			}));
	};

	return (
		<Layout.Cell margin={stacked ? '0' : '0 1rem 0 0'}>
			<Protected inline>
				<Row direction={stacked ? 'column' : 'row'}>
					<Layout.Cell margin={stacked ? '0' : '0 1rem 0 0'}>
						<GoogleMapWrapper>
							<GoogleMaps markers={getMarkers()} />
						</GoogleMapWrapper>
					</Layout.Cell>
					<Layout.Cell>
						<MapLegend>
							<Row>
								<Layout.Column flex align="center">
									<CheckBoxField
										name={technologyLocationsEnum.WHO_DEVELOP}
										label={
											<Row align="center" justify="center" mb={0}>
												<Icon
													src={getMarkerIconByTerm.get(
														technologyLocationsEnum.WHO_DEVELOP,
													)}
													size={32}
												/>
												<Label>Onde é desenvolvida</Label>
											</Row>
										}
										onChange={() =>
											handleMarkerFilterChange(
												technologyLocationsEnum.WHO_DEVELOP,
											)
										}
										value={markerFilters.includes(
											technologyLocationsEnum.WHO_DEVELOP,
										)}
									/>
								</Layout.Column>
							</Row>
							<Row>
								<Layout.Column flex align="center">
									<CheckBoxField
										name={technologyLocationsEnum.WHERE_CAN_BE_APPLIED}
										label={
											<Row align="center" justify="center" mb={0}>
												<Icon
													src={getMarkerIconByTerm.get(
														technologyLocationsEnum.WHERE_CAN_BE_APPLIED,
													)}
													size={32}
												/>
												<Label>Onde pode ser aplicada</Label>
											</Row>
										}
										onChange={() =>
											handleMarkerFilterChange(
												technologyLocationsEnum.WHERE_CAN_BE_APPLIED,
											)
										}
										value={markerFilters.includes(
											technologyLocationsEnum.WHERE_CAN_BE_APPLIED,
										)}
									/>
								</Layout.Column>
							</Row>
							<Row>
								<Layout.Column flex align="center">
									<CheckBoxField
										name={technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED}
										label={
											<Row align="center" justify="center" mb={0}>
												<Icon
													src={getMarkerIconByTerm.get(
														technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED,
													)}
													size={32}
												/>
												<Label>Onde já está implementada</Label>
											</Row>
										}
										onChange={() =>
											handleMarkerFilterChange(
												technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED,
											)
										}
										value={markerFilters.includes(
											technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED,
										)}
									/>
								</Layout.Column>
							</Row>
						</MapLegend>
					</Layout.Cell>
				</Row>
			</Protected>
		</Layout.Cell>
	);
};

const Row = styled(Layout.Row)`
	${({ theme: { colors, screens } }) => css`
		background-color: ${colors.white};

		& > *:not(:first-child):not(:last-child) {
			margin: 0 1rem;
		}

		@media (max-width: ${screens.large}px) {
			& > *:not(:first-child):not(:last-child) {
				margin-top: 1.5rem;
			}
		}
	`}
`;

export const MapLegend = styled.div`
	margin-top: 2rem;
`;
export const Icon = styled.img`
	${({ size }) => (size ? 'height: 32px; width: 32px;' : '')}
`;
export const Label = styled.div``;
export const GoogleMapWrapper = styled.div`
	flex: 1;
	position: relative;
	display: block;
	height: 60vh;
	width: 100%;
`;

Geolocation.propTypes = {
	stacked: PropTypes.bool,
};

Geolocation.defaultProps = {
	stacked: false,
};

export default Geolocation;
