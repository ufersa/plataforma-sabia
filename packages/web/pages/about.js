import React from 'react';
import { Element } from 'react-scroll';

import { Platform, About, Features, Resources, Contact } from '../components/LandingPage';

const Welcome = () => {
	return (
		<>
			<Element id="platform" name="platform" className="element">
				<Platform />
				<About />
			</Element>
			<Element id="features" name="features" className="element">
				<Features />
			</Element>
			<Element id="resources" name="resources" className="element">
				<Resources />
			</Element>
			<Element id="contact" name="contact" className="element">
				<Contact />
			</Element>
		</>
	);
};

export default Welcome;
