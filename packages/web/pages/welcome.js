import React from 'react';

import {
	Platform,
	About,
	Features,
	Resources,
	Partnerships,
	Contact,
} from '../components/LandingPage';

const Welcome = () => {
	return (
		<>
			<Platform />
			<About />
			<Features />
			<Resources />
			<Partnerships />
			<Contact />
		</>
	);
};

export default Welcome;
