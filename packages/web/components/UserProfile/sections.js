import { FaRegListAlt, FaRegUserCircle, FaHeart, FaSuitcase, FaEnvelope } from 'react-icons/fa';

const sections = [
	{
		slug: 'userArea',
		pages: [{ slug: 'myProfile', href: '', icon: FaRegUserCircle }],
	},
	{
		slug: 'researcherArea',
		pages: [
			{ slug: 'myTechnologies', href: '/technologies', icon: FaRegListAlt },
			{ slug: 'myNegotiations', href: '', icon: FaSuitcase },
			{ slug: 'messages', href: '', icon: FaEnvelope },
			{ slug: 'favoriteTechnologies', href: '', icon: FaHeart },
		],
	},
];

export default sections;
