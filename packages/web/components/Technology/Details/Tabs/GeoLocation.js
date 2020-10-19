import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import useTechnology from '../../../../hooks/useTechnology';
import * as Layout from '../../../Common/Layout';
import GoogleMaps, { getMarkerIconByTerm } from '../../../GoogleMaps';
import TechonologyEnums from '../../../../utils/enums/technology.enums';
import CheckBoxField from '../../../Form/CheckBoxField';
import { Protected } from '../../../Authorization';

const Geolocation = ({ rawTerms, stacked }) => {
	const { technology } = useTechnology();
	const [markerFilters, setMarkerFilters] = useState([
		TechonologyEnums.WHO_DEVELOP,
		TechonologyEnums.WHERE_CAN_BE_APPLIED,
		TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED,
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

	const parseTermMetaIntoMarker = (term) => {
		const marker = { type: term.term };
		term.metas.forEach(({ meta_key, meta_value }) => {
			marker[meta_key] = meta_value;
		});
		return marker;
	};

	const getMarkers = () => {
		const terms = technology?.terms || rawTerms;

		if (!terms) {
			return null;
		}

		return terms
			.filter(
				({ term }) =>
					[
						TechonologyEnums.WHO_DEVELOP,
						TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED,
					].includes(term) && markerFilters.includes(term),
			)
			.map(parseTermMetaIntoMarker);
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
										name={TechonologyEnums.WHO_DEVELOP}
										label={
											<Row align="center" justify="center" mb={0}>
												<Icon
													src={getMarkerIconByTerm.get(
														TechonologyEnums.WHO_DEVELOP,
													)}
													size={32}
												/>
												<Label>Onde é desenvolvida</Label>
											</Row>
										}
										onChange={() =>
											handleMarkerFilterChange(TechonologyEnums.WHO_DEVELOP)
										}
										value={markerFilters.includes(TechonologyEnums.WHO_DEVELOP)}
									/>
								</Layout.Column>
							</Row>
							<Row>
								<Layout.Column flex align="center">
									<CheckBoxField
										name={TechonologyEnums.WHERE_CAN_BE_APPLIED}
										label={
											<Row align="center" justify="center" mb={0}>
												<Icon
													src={getMarkerIconByTerm.get(
														TechonologyEnums.WHERE_CAN_BE_APPLIED,
													)}
													size={32}
												/>
												<Label>Onde pode ser aplicada</Label>
											</Row>
										}
										onChange={() =>
											handleMarkerFilterChange(
												TechonologyEnums.WHERE_CAN_BE_APPLIED,
											)
										}
										value={markerFilters.includes(
											TechonologyEnums.WHERE_CAN_BE_APPLIED,
										)}
									/>
								</Layout.Column>
							</Row>
							<Row>
								<Layout.Column flex align="center">
									<CheckBoxField
										name={TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED}
										label={
											<Row align="center" justify="center" mb={0}>
												<Icon
													src={getMarkerIconByTerm.get(
														TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED,
													)}
													size={32}
												/>
												<Label>Onde já está implementada</Label>
											</Row>
										}
										onChange={() =>
											handleMarkerFilterChange(
												TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED,
											)
										}
										value={markerFilters.includes(
											TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED,
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
	rawTerms: PropTypes.arrayOf(PropTypes.shape({})),
	stacked: PropTypes.bool,
};

Geolocation.defaultProps = {
	rawTerms: null,
	stacked: false,
};

export default Geolocation;
