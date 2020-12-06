import React from 'react';

import { Platform, About, Features, Resources, Partnerships } from '../components/LandingPage';

const Welcome = () => {
	return (
		<>
			<Platform />
			<About />
			<Features />
			<Resources />
			<Partnerships />
		</>
	);
};

export default Welcome;
