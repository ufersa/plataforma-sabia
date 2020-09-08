import React from 'react';
import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';
import TechonologyEnums from '../../utils/enums/technology.enums';

export const getMarkerIconByTerm = new Map([
	[TechonologyEnums.WHO_DEVELOP, '/google-map-marker-icon.png'],
	[TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED, '/google-map-marker-icon-2.png'],
	[TechonologyEnums.WHERE_CAN_BE_APPLIED, '/google-map-marker-icon-3.png'],
]);

const MapContainer = ({ google, markers }) => {
	return (
		<GoogleMap
			google={google}
			zoom={7}
			initialCenter={{
				lat: -6.780127,
				lng: -36.702823,
			}}
		>
			{markers.map((marker) => {
				return (
					<Marker
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
	google: PropTypes.shape({
		maps: PropTypes.shape({
			Point: PropTypes.func,
			Size: PropTypes.func,
		}),
	}).isRequired,
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

export default GoogleApiWrapper({
	apiKey: 'AIzaSyDlQrq14K2OTjUxioB4fW7NJTzZQ2ZFtxA',
})(MapContainer);
