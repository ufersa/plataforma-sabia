import React from 'react';
import { Map as GoogleMap, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';
import { LOCATIONS as technologyLocationsEnum } from '../../utils/enums/technology.enums';

export const getMarkerIconByTerm = new Map([
	[technologyLocationsEnum.WHO_DEVELOP, '/google-map-marker-icon.png'],
	[technologyLocationsEnum.WHERE_IS_ALREADY_IMPLEMENTED, '/google-map-marker-icon-2.png'],
	[technologyLocationsEnum.WHERE_CAN_BE_APPLIED, '/google-map-marker-icon-3.png'],
]);

const MapContainer = ({ markers }) => {
	const google = typeof window !== 'undefined' && window.google;

	return (
		<GoogleMap
			google={google}
			zoom={7}
			initialCenter={{
				lat: -6.780127,
				lng: -36.702823,
			}}
		>
			{google &&
				markers &&
				markers.map((marker) => {
					return (
						<Marker
							key={`${Math.abs(marker.latitude)}`}
							title={marker.description}
							position={{ lat: marker.latitude, lng: marker.longitude }}
							icon={{
								url: getMarkerIconByTerm.get(marker.type),
								anchor: new google.maps.Point(32, 32),
								scaledSize: new google.maps.Size(32, 32),
							}}
						/>
					);
				})}
		</GoogleMap>
	);
};

MapContainer.propTypes = {
	markers: PropTypes.arrayOf(
		PropTypes.shape({
			description: PropTypes.string,
			latitude: PropTypes.string,
			longitude: PropTypes.string,
		}),
	),
};

MapContainer.defaultProps = {
	markers: [],
};

export default MapContainer;
