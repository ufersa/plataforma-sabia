import React from 'react';

import { render, screen } from 'test-utils';
import RequestSentModal from '../RequestSentModal';

describe('<RequestSentModal />', () => {
	it('should render correctly', () => {
		const { container } = render(<RequestSentModal />);

		expect(screen.getByRole('img', { src: /time-management-rafiki.svg/i })).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
