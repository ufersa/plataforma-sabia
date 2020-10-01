import React from 'react';

import Geolocation from '../../../Technology/Details/Tabs/GeoLocation';
import { Container } from '../styles';

const GeolocationTab = () => {
	return (
		<Container overflow="scroll" maxHeight="50vh">
			<Geolocation />
		</Container>
	);
};

export default GeolocationTab;
